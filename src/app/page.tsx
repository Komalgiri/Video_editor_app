// app/page.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <h1 className="text-4xl font-bold mb-4">Web Video Editor</h1>
      <p className="text-center max-w-md mb-6 text-muted-foreground">
        Upload, edit, and manage videos effortlessly — powered by Next.js, ShadCN, and Redux Toolkit.
      </p>
      <Link href="/editor">
        <Button variant="default">Go to Editor</Button>
      </Link>
    </main>
  );
}
