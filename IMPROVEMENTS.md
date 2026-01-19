# Portfolio Improvement Guide

A learning-focused roadmap to transform this portfolio from "AI-generated template" to "handcrafted professional showcase."

---

## Part 1: TypeScript Learning Opportunities

These are the best places to practice real TypeScript patterns.

### 1.1 Replace `any` and `unknown` Types

**File: `hooks/use-outside-click.tsx`**

Current (weak):
```typescript
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function  // Too generic
) => {
  useEffect(() => {
    const listener = (event: any) => {  // any = no safety
```

Better (typed):
```typescript
type ClickCallback = (event: MouseEvent | TouchEvent) => void;

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: ClickCallback
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
```

**Learning**: `Function` type accepts anything. Define explicit callback signatures.

---

**File: `components/SeveranceUI/types.ts`**

Current:
```typescript
textAlign: (alignment: unknown) => void;
CENTER: unknown;
```

Better:
```typescript
type TextAlignment = 'left' | 'center' | 'right';
textAlign: (alignment: TextAlignment) => void;
CENTER: TextAlignment;
```

**Learning**: Use union types for constrained values instead of `unknown`.

---

### 1.2 Fix Type Casting Anti-Patterns

**File: `components/ui/globe.tsx`**

Current (unsafe double cast):
```typescript
const globeMaterial = globeRef.current.globeMaterial() as unknown as {
  color: Color;
  emissive: Color;
};
```

Better (proper interface):
```typescript
interface GlobeMaterial {
  color: Color;
  emissive: Color;
  emissiveIntensity: number;
  shininess: number;
}

// At the top of file, or in a types.ts
const globeMaterial = globeRef.current.globeMaterial() as GlobeMaterial;
```

**Learning**: `as unknown as X` is a code smell. Define interfaces for external library returns.

---

### 1.3 Generic Component Props

**File: `components/ui/3d-card.tsx`**

Current:
```typescript
as: Tag = "div",  // Unclear
```

Better:
```typescript
interface CardContainerProps<T extends React.ElementType = 'div'> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function CardContainer<T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  containerClassName,
  ...props
}: CardContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardContainerProps<T>>) {
  const Component = as || 'div';
  // ...
}
```

**Learning**: Generic components let you preserve type safety when the element type is configurable.

---

### 1.4 Create a Types File

Create `types/index.ts` for shared types:

```typescript
// Project types
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  period: string;
  highlights: string[];  // Measurable achievements
}

// Animation presets
export interface AnimationPreset {
  initial: { opacity: number; y?: number; x?: number };
  animate: { opacity: number; y?: number; x?: number };
  transition: { duration: number; delay?: number };
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

// Technology/Skill
export interface Technology {
  name: string;
  icon: string;  // URL or component name
  category: 'frontend' | 'backend' | 'devops' | 'ml' | 'tools';
  proficiency: 'learning' | 'comfortable' | 'proficient' | 'expert';
}
```

---

## Part 2: Remove AI-Generated Patterns

### 2.1 Replace Emoji Icons (Biggest Red Flag)

**File: `app/components/Skills.tsx`**

Current (screams AI-generated):
```typescript
const skills = [
  { name: 'Python', level: 95, icon: '🐍' },
  { name: 'JavaScript/TypeScript', level: 90, icon: '🟨' },
```

Better (use lucide-react, already installed):
```typescript
import {
  Code2,
  Database,
  Cloud,
  Brain,
  Server,
  Palette
} from 'lucide-react';

const skills = [
  { name: 'Python', level: 95, Icon: Code2 },
  { name: 'JavaScript/TypeScript', level: 90, Icon: Code2 },
```

Or use actual brand SVGs from Simple Icons (simpleicons.org).

---

### 2.2 Extract Repeated Animation Patterns

Current (repeated 50+ times across files):
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

Create `lib/animations.ts`:
```typescript
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Viewport settings
export const viewportOnce = { once: true, margin: '-100px' };
```

Usage becomes cleaner:
```typescript
import { fadeInUp, viewportOnce } from '@/lib/animations';

<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
>
```

---

### 2.3 Extract Hardcoded Colors

Current (scattered everywhere):
```typescript
text-[#ABFFE9]
bg-[#05C3A8]/30
border-[#1EEFFF]
```

Create `tailwind.config.ts` theme extension:
```typescript
theme: {
  extend: {
    colors: {
      brand: {
        teal: '#05C3A8',
        mint: '#ABFFE9',
        cyan: '#1EEFFF',
        dark: '#010A13',
      }
    }
  }
}
```

Now use semantic names:
```typescript
text-brand-mint
bg-brand-teal/30
border-brand-cyan
```

---

### 2.4 Remove Placeholder Comments

Delete these from production code:
- `{/* Add profile picture */}` in About.tsx
- Commented-out demo button code in Projects.tsx
- Any `// TODO` without actual intent to do

---

## Part 3: Recruiter-Focused Improvements

### 3.1 Rewrite Generic Content

**Current About Text (template-like):**
> "Hello! I'm Rishikesh Gharat, a Computer Science graduate student at New York University with a passion for full-stack development..."

**Better (specific, memorable):**
> "I build tools that make developers' lives easier. At NYU, I created LocalPilotAI—an offline code completion tool that runs entirely on your machine. No cloud, no latency, no privacy concerns. Currently exploring how LLMs can augment (not replace) developer workflows."

The difference: Generic says what you are. Specific says what you *do* and *think*.

---

### 3.2 Add Measurable Impact to Projects

**Current:**
```typescript
{
  title: 'Personality Prediction for CV Analysis',
  description: 'ML model to predict candidates personalities through sentiment analysis using Big 5 traits.',
}
```

**Better:**
```typescript
{
  title: 'Personality Prediction for CV Analysis',
  description: 'ML model achieving 87% accuracy in predicting Big 5 personality traits from resume text.',
  highlights: [
    'Processed 10,000+ resumes in training dataset',
    'Reduced HR screening time by 40% in pilot study',
    'Built with scikit-learn, NLTK, deployed on AWS Lambda'
  ],
  problemSolved: 'HR teams spend hours reading resumes. This tool surfaces personality fit automatically.',
}
```

---

### 3.3 Add a Real Contact Form

**Current:** Just displays email/phone text (recruiter has to copy-paste)

**Add actual form with validation:**
```typescript
// app/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Use Formspree, Resend, or your own API
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {/* Form fields here */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex items-center gap-2 bg-brand-teal px-6 py-3 rounded-lg"
      >
        {status === 'sending' ? <Loader2 className="animate-spin" /> : <Send />}
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

### 3.4 Add Resume Download CTA

Prominent button in Hero or Contact:
```typescript
<a
  href="/resume.pdf"
  download="Rishikesh_Gharat_Resume.pdf"
  className="inline-flex items-center gap-2 bg-brand-teal text-black px-6 py-3 rounded-lg font-medium"
>
  <Download size={20} />
  Download Resume
</a>
```

---

### 3.5 Prioritize Projects Visually

Don't show all projects equally. Create hierarchy:

```typescript
// Featured project (larger, more detail)
<FeaturedProject project={projects[0]} />

// Other projects (smaller grid)
<div className="grid grid-cols-2 gap-4">
  {projects.slice(1).map(p => <ProjectCard key={p.id} project={p} />)}
</div>
```

---

## Part 4: Code Quality & Architecture

### 4.1 Consolidate Duplicate Directories

Current:
```
components/SeveranceUI/  ← Original
app/components/SeveranceUI/  ← Duplicate?
```

Pick one location. Delete the other. Update imports.

---

### 4.2 Fix Invalid Tailwind Classes

**File: `app/components/CurrentTechnologies.tsx`**
```typescript
py-21  // ← Doesn't exist in Tailwind
```

Should be `py-20` or `py-24` (Tailwind uses 4-unit increments).

---

### 4.3 Fix CSS Redundancy

**File: `app/globals.css`**
```css
.severance-ui {
  cursor: none !important;
}
.severance-ui:hover {
  cursor: none !important;  /* Redundant */
}
```

Consolidate:
```css
.severance-ui,
.severance-ui:hover {
  cursor: none;
}
```

Also investigate why `!important` is needed—usually indicates conflicting styles.

---

### 4.4 Fix Gradient Animation

**File: `app/globals.css`**

Current (broken):
```css
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.gradient-bg {
  animation: gradient 15s ease infinite;
  /* Missing background-size! */
}
```

Fixed:
```css
.gradient-bg {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}
```

---

## Part 5: Accessibility Fixes

### 5.1 Add Semantic Button for Hamburger Menu

**File: `app/components/Navbar.tsx`**

Current:
```typescript
<button onClick={() => setIsOpen(!isOpen)} className="...">
  <span className="sr-only">Open menu</span>
  <div className="w-6 h-6 flex flex-col justify-around">
    <span className={...}></span>
    <span className={...}></span>
    <span className={...}></span>
  </div>
</button>
```

Better:
```typescript
<button
  onClick={() => setIsOpen(!isOpen)}
  className="..."
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label={isOpen ? "Close menu" : "Open menu"}
>
  {/* ... */}
</button>

<nav id="mobile-menu" aria-hidden={!isOpen}>
  {/* menu items */}
</nav>
```

---

### 5.2 Add Skip Link

At the top of `layout.tsx`:
```typescript
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-teal text-black px-4 py-2 rounded"
>
  Skip to main content
</a>
```

And in `page.tsx`:
```typescript
<main id="main-content">
```

---

### 5.3 Improve Image Alt Text

**File: `app/components/Projects.tsx`**

Current:
```typescript
alt={project.title}  // "LocalPilotAI" is not descriptive
```

Better:
```typescript
alt={`Screenshot of ${project.title}: ${project.description.slice(0, 50)}...`}
```

---

## Part 6: Performance Quick Wins

### 6.1 Optimize External Images

**File: `app/components/CurrentTechnologies.tsx`**

Current:
```typescript
<Image
  src={tech.icon}
  unoptimized  // ← Disables Next.js optimization
/>
```

Better: Use Next.js image loader or self-host critical icons:
```typescript
<Image
  src={tech.icon}
  loader={({ src }) => src}  // For external URLs
  // Or better: download icons to /public/icons/ and reference locally
/>
```

---

### 6.2 Lazy Load Below-Fold Sections

```typescript
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('./components/Projects'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-800" />
});

const Contact = dynamic(() => import('./components/Contact'));
```

---

## Implementation Priority

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 1 | Replace emoji icons with lucide-react | High (perception) | Low |
| 2 | Rewrite About/Project descriptions with specifics | High (recruiter) | Medium |
| 3 | Add contact form | High (conversion) | Medium |
| 4 | Fix TypeScript types in hooks/utils | High (learning) | Low |
| 5 | Extract animation presets | Medium (code quality) | Low |
| 6 | Extract color constants to theme | Medium (maintainability) | Low |
| 7 | Add resume download button | High (recruiter) | Low |
| 8 | Consolidate SeveranceUI directories | Medium (cleanliness) | Low |
| 9 | Fix accessibility issues | Medium (compliance) | Medium |
| 10 | Create types file | Medium (learning) | Low |

---

## Summary

The biggest changes that will make this feel "handcrafted" rather than "AI-generated":

1. **Specificity over generics** - Replace template text with your actual stories, numbers, and opinions
2. **Proper icon system** - Emojis are the #1 tell of AI-generated code
3. **TypeScript rigor** - `any` and `Function` types signal inexperience
4. **Consolidated patterns** - One animation system, one color system, one source of truth
5. **Recruiter UX** - Form to contact you, resume to download, clear project hierarchy

Each fix is also a TypeScript learning opportunity. Start with the types file and work outward.
