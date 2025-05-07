import Link from "next/link";

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "[site name]"; // Fallback to default

  return (
    <header className="sticky top-0  z-10">
      <div className="max-w-screen-lg mx-auto w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link href="/about">Über mich</Link>
            <Link href="/contact">Kontakt</Link>
          </div>
          <h1 className="text-2xl font-bold">
            <Link href="/">{siteName}</Link>
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="/">Home</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
