import Link from "next/link";

export default function ImpressumLink() {
  return (
    <div className="fixed top-0 right-0 p-2 z-50 ">
      <Link href="/impressum" className="p-2">
        Impressum
      </Link>
    </div>
  );
}
