import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? "backdrop-blur-xl bg-black/60 py-3" : "py-5"}`}
    >
      <div className="flex justify-between items-center px-10">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/logo.png"
            className="w-9 h-9 rounded-lg"
          />
          <h1 className="text-purple-400 font-bold text-xl">
            Productify AI
          </h1>
        </div>

        {/* NAV */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <span className="hover:text-purple-400 cursor-pointer">Home</span>
          <span className="hover:text-purple-400 cursor-pointer">Analyze</span>
          <span className="hover:text-purple-400 cursor-pointer">Dashboard</span>
        </div>

      </div>
    </div>
  );
}