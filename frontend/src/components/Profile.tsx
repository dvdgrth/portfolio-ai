import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const first_name =
    process.env.NEXT_PUBLIC_PROFILE_FIRST_NAME || "[first name]";
  const github = process.env.NEXT_PUBLIC_PROFILE_GITHUB || "#";
  const linkedin = process.env.NEXT_PUBLIC_PROFILE_LINKEDIN || "#";

  const profileImage =
    process.env.NEXT_PUBLIC_PROFILE_IMAGE || "/default_profile_pic.jpg";

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 justify-center">
        {/* Profile Image */}
        <Image
          src={profileImage}
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full grayscale-60 contrast-150 brightness-110 border border-gray-500 shadow-xl"
        />
      </div>
      <div className="mt-6 text-center space-y-2">
        <p>Persönliche Website von {first_name}.</p>

        <p>Ein Software-Entwickler auf der Suche nach seinem Traumjob.</p>
      </div>

      <div className="mt-4 text-center">
        <nav className="flex flex-col items-center gap-2">
          <Link
            href="/about"
            className="px-4 py-2 underline bg-background-darker"
          >
            Über mich
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 underline bg-background-darker"
          >
            Kontakt
          </Link>
          <Link
            href="/impressum"
            className="px-4 py-2 underline bg-background-darker"
          >
            Impressum
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        <div className="flex gap-4 justify-center">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 inline-flex items-center"
          >
            <Image
              src="/github-mark.svg"
              alt="GitHub"
              width={40}
              height={40}
              className="inline"
            />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 inline-flex items-center"
          >
            <Image
              src="/InBug-Black.png"
              alt="LinkedIn"
              width={40}
              height={40}
              className="inline"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
