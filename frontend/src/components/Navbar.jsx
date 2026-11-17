export default function Navbar({ loggedIn, onLogout }) {
  return (
    <nav className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold">
          TaskFlow <span className="text-indigo-400">AI</span>
        </span>

        <div className="flex items-center gap-4 text-sm">
          <a href="#features" className="hidden text-slate-300 transition hover:text-white sm:block">
            Features
          </a>
          {loggedIn ? (
            <button onClick={onLogout} className="btn-ghost px-4 py-2 text-sm">
              Log out
            </button>
          ) : (
            <a href="#app" className="btn-primary px-4 py-2 text-sm">
              Get started
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
