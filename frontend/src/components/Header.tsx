import Link from "next/link";

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "[site name]"; // Fallback to default

  return (
    <header className="sticky top-0 bg-white shadow z-10">
      <div className="max-w-screen-lg mx-auto w-full">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">
            <Link href="/">{siteName}</Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
