export type Bounds = {
  x: number
  y: number
  width: number
  height: number
}

export type WindowNode = {
  type: 'window'
  id: string
  depth: number
}

export type SplitNode = {
  type: 'split'
  direction: 'horizontal' | 'vertical'
  ratio: number
  first: TreeNode
  second: TreeNode
  depth: number
}

export type TreeNode = WindowNode | SplitNode

// Compute flat map of windowId → Bounds by recursively walking tree
export function computeLayout(
  node: TreeNode,
  bounds: Bounds,
  gap: number = 4
): Record<string, Bounds> {
  if (node.type === 'window') {
    return { [node.id]: bounds }
  }

  const { direction, ratio, first, second } = node

  if (direction === 'horizontal') {
    const firstWidth = Math.floor((bounds.width - gap) * ratio)
    const secondWidth = bounds.width - gap - firstWidth
    return {
      ...computeLayout(first, {
        x: bounds.x,
        y: bounds.y,
        width: firstWidth,
        height: bounds.height
      }, gap),
      ...computeLayout(second, {
        x: bounds.x + firstWidth + gap,
        y: bounds.y,
        width: secondWidth,
        height: bounds.height
      }, gap)
    }
  } else {
    const firstHeight = Math.floor((bounds.height - gap) * ratio)
    const secondHeight = bounds.height - gap - firstHeight
    return {
      ...computeLayout(first, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: firstHeight
      }, gap),
      ...computeLayout(second, {
        x: bounds.x,
        y: bounds.y + firstHeight + gap,
        width: bounds.width,
        height: secondHeight
      }, gap)
    }
  }
}

// Open a new window by splitting the focused node
// Returns a new tree with the new window inserted
export function openWindow(
  tree: TreeNode | null,
  focusedId: string | null,
  newId: string
): TreeNode {
  if (!tree) {
    return { type: 'window', id: newId, depth: 0 }
  }

  if (!focusedId) {
    // No focus — split root
    const dir = tree.depth % 2 === 0 ? 'horizontal' : 'vertical'
    return {
      type: 'split',
      direction: dir,
      ratio: 0.5,
      depth: tree.depth,
      first: tree,
      second: { type: 'window', id: newId, depth: tree.depth + 1 }
    }
  }

  return insertIntoTree(tree, focusedId, newId)
}

function insertIntoTree(
  node: TreeNode,
  targetId: string,
  newId: string
): TreeNode {
  if (node.type === 'window') {
    if (node.id === targetId) {
      const dir = node.depth % 2 === 0 ? 'horizontal' : 'vertical'
      return {
        type: 'split',
        direction: dir,
        ratio: 0.5,
        depth: node.depth,
        first: node,
        second: { type: 'window', id: newId, depth: node.depth + 1 }
      }
    }
    return node
  }

  return {
    ...node,
    first: insertIntoTree(node.first, targetId, newId),
    second: insertIntoTree(node.second, targetId, newId)
  }
}

// Close a window by replacing its parent split with the sibling
export function closeWindow(
  tree: TreeNode | null,
  targetId: string
): TreeNode | null {
  if (!tree) return null
  if (tree.type === 'window') {
    return tree.id === targetId ? null : tree
  }

  // Check if either child is the target window
  if (tree.first.type === 'window' && tree.first.id === targetId) {
    return tree.second
  }
  if (tree.second.type === 'window' && tree.second.id === targetId) {
    return tree.first
  }

  return {
    ...tree,
    first: closeWindow(tree.first, targetId) ?? tree.first,
    second: closeWindow(tree.second, targetId) ?? tree.second
  }
}

// Get all window ids currently in the tree
export function getWindowIds(tree: TreeNode | null): string[] {
  if (!tree) return []
  if (tree.type === 'window') return [tree.id]
  return [...getWindowIds(tree.first), ...getWindowIds(tree.second)]
}

// Get all split nodes with their paths (for rendering handles)
export type SplitInfo = {
  node: SplitNode
  path: string // unique identifier for this split
  bounds: Bounds
}

export function getSplits(
  node: TreeNode,
  bounds: Bounds,
  gap: number = 4,
  path: string = 'root'
): SplitInfo[] {
  if (node.type === 'window') return []

  const splits: SplitInfo[] = [{ node, path, bounds }]

  if (node.direction === 'horizontal') {
    const firstWidth = Math.floor((bounds.width - gap) * node.ratio)
    splits.push(...getSplits(node.first, {
      x: bounds.x, y: bounds.y,
      width: firstWidth, height: bounds.height
    }, gap, path + '-first'))
    splits.push(...getSplits(node.second, {
      x: bounds.x + firstWidth + gap, y: bounds.y,
      width: bounds.width - gap - firstWidth, height: bounds.height
    }, gap, path + '-second'))
  } else {
    const firstHeight = Math.floor((bounds.height - gap) * node.ratio)
    splits.push(...getSplits(node.first, {
      x: bounds.x, y: bounds.y,
      width: bounds.width, height: firstHeight
    }, gap, path + '-first'))
    splits.push(...getSplits(node.second, {
      x: bounds.x, y: bounds.y + firstHeight + gap,
      width: bounds.width, height: bounds.height - gap - firstHeight
    }, gap, path + '-second'))
  }

  return splits
}

// Update ratio of a specific split node by path
export function updateSplitRatio(
  tree: TreeNode,
  path: string,
  newRatio: number,
  currentPath: string = 'root'
): TreeNode {
  if (tree.type === 'window') return tree
  if (currentPath === path) {
    return { ...tree, ratio: Math.max(0.15, Math.min(0.85, newRatio)) }
  }
  return {
    ...tree,
    first: updateSplitRatio(tree.first, path, newRatio, currentPath + '-first'),
    second: updateSplitRatio(tree.second, path, newRatio, currentPath + '-second')
  }
}
