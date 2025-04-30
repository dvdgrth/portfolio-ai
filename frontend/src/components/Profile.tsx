import Image from "next/image";

export default function Profile() {
  const name = process.env.NEXT_PUBLIC_PROFILE_NAME || "[name]";
  const bio = process.env.NEXT_PUBLIC_PROFILE_BIO || "[bio]";
  const github = process.env.NEXT_PUBLIC_PROFILE_GITHUB || "#";
  const linkedin = process.env.NEXT_PUBLIC_PROFILE_LINKEDIN || "#";

  const profileImage =
    process.env.NEXT_PUBLIC_PROFILE_IMAGE || "/default_profile_pic.jpg";

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <Image
          src={profileImage}
          alt="Profile"
          width={128}
          height={128}
          className="rounded-full"
        />
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <p className="mt-2">{bio}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Meine Interessen</h3>
        <ul className="list-disc list-inside">
          <li>Web</li>
          <li>KI</li>
          <li>Programmieren</li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Meine Links</h3>
        <ul className="list-disc list-inside">
          <li>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
