import { NextResponse } from "next/server";

const USERNAME = "Matrix030";

export async function GET() {
  try {
    const res = await fetch(
      `https://github.com/users/${USERNAME}/contributions`,
      {
        headers: { Accept: "text/html" },
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 502 }
      );
    }

    const html = await res.text();

    // Parse data-date and data-level from the contribution calendar HTML
    // Each cell looks like: <td ... data-date="2025-01-15" data-level="2" ...>
    const cells: { date: string; level: number }[] = [];
    const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      cells.push({ date: match[1], level: parseInt(match[2], 10) });
    }

    return NextResponse.json(cells);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
