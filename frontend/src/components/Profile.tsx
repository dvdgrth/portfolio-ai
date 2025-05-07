import Image from "next/image";

export default function Profile() {
  const first_name =
    process.env.NEXT_PUBLIC_PROFILE_FIRST_NAME || "[first name]";
  const last_name = process.env.NEXT_PUBLIC_PROFILE_LAST_NAME || "[last name]";
  const bio = process.env.NEXT_PUBLIC_PROFILE_BIO || "[bio]";
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
          className="rounded-full grayscale-80 contrast-150 brightness-110 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        />

      </div>
      <div className="mt-2 text-center space-y-2">
        <p>{first_name}.</p>
        <p>Softwareentwickler.</p>
      </div>

      <div className="mt-4">
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
              width={50}
              height={50}
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
              width={50}
              height={50}
              className="inline"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
