const features = [
  {
    icon: "🧠",
    title: "AI prioritization",
    text: "Automatically ranks your tasks so you always know what to do next.",
  },
  {
    icon: "⚡",
    title: "Fast and simple",
    text: "Add, complete, and organize tasks in seconds with a clean interface.",
  },
  {
    icon: "🔒",
    title: "Secure by default",
    text: "Your account is protected with token-based authentication.",
  },
  {
    icon: "📱",
    title: "Works everywhere",
    text: "A responsive layout that feels just as good on phones as on desktops.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">
        Everything you need, nothing you don't
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="card p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
