import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500 selection:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            LyricLens
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Transform your lyrics into a visual masterpiece. Powered by Venice.ai.
          </p>
        </header>
        <Dashboard />
        </div>
      </main>
  );
}
