import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AuthForm from "./components/AuthForm";
import TaskList from "./components/TaskList";
import CTA from "./components/CTA";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Hero />
      <Features />

      <section id="app" className="mx-auto max-w-3xl px-6 py-16">
        {loggedIn ? (
          <TaskList />
        ) : (
          <AuthForm onAuth={() => setLoggedIn(true)} />
        )}
      </section>

      <CTA />

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © 2026 TaskFlow AI. All rights reserved.
      </footer>
    </div>
  );
}
