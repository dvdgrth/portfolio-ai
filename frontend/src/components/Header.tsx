import Link from "next/link";

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "[site name]";

  return (
    <header className="sticky top-0 z-10">
      <div className="max-w-screen-lg mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">{siteName}</Link>
        </h1>
      </div>
    </header>
  );
}
