import BackToHome from "@/components/BackToHome";
import ImpressumLink from "@/components/ImpressumLink";
import Image from "next/image";

export default function AboutPage() {
  const profileImage =
    process.env.NEXT_PUBLIC_PROFILE_IMAGE || "/default_profile_pic.jpg";
  const first_name =
    process.env.NEXT_PUBLIC_PROFILE_FIRST_NAME || "[first name]";

  return (
    <div className="max-w-2xl w-full mx-auto p-6">
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
      <BackToHome />

      <div className="space-y-4">
        <h1 className="text-2xl mt-10">Über mich</h1>
        <p>
          Ich bin {first_name}, ein Softwareentwickler Software-Entwickler auf
          der Suche nach seinem Traumjob.
        </p>
        <p>
          Ich habe in verschiedenen Bereichen gearbeitet, hauptsächlich in der
          Webentwicklung. In Zukunft würde ich gerne mehr im Bereich der
          künstlichen Intelligenz arbeiten.
        </p>
      </div>
      <ImpressumLink />
    </div>
  );
}
