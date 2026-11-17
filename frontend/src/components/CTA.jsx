export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-pink-600 p-12 text-center shadow-2xl shadow-indigo-600/20">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to get organized?</h2>
        <p className="mx-auto mt-4 max-w-xl text-indigo-100">
          Create a free account in under a minute and start planning smarter today.
        </p>
        <a
          href="#app"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
        >
          Create free account
        </a>
      </div>
    </section>
  );
}
