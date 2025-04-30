import ChatUI from "@/components/ChatUi";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="bg-neutral-50 flex-1 flex justify-center h-[calc(100vh-60px)]">
      <div className="flex w-full max-w-screen-lg h-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Section */}
        <div className="w-1/3  p-4">
          <Profile />
        </div>

        {/* ChatUI Section */}
        <div className="w-2/3 bg-white p-4 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto h-full">
            <ChatUI />
          </div>
        </div>
      </div>
    </main>
  );
}
