export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center animate-fade-up">
      <span className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-300">
        Now with AI task suggestions
      </span>

      <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
        Plan less.{" "}
        <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Finish more.
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
        TaskFlow AI organizes your work, prioritizes what matters, and keeps you on
        track without the busywork.
      </p>

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <a href="#app" className="btn-primary">
          Start free
        </a>
        <a href="#features" className="btn-ghost">
          See features
        </a>
      </div>
    </section>
  );
}
