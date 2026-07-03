import Link from "next/link";

export default function MarketingHomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <h1 className="text-5xl font-bold tracking-tight">
        ChatOrbit AI
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        AI-powered WhatsApp automation for businesses. Manage contacts, automate replies, and power conversations with intelligent AI agents.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/contacts"
          className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Open Dashboard
        </Link>

        <Link
          href="/conversations"
          className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          View Demo Chat
        </Link>
      </div>
    </main>
  );
}
