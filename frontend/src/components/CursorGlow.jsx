import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999]"
      style={{
        background: `radial-gradient(
          400px circle at ${pos.x}px ${pos.y}px,
          rgba(168,85,247,0.20),
          rgba(6,182,212,0.10),
          transparent 70%
        )`,
      }}
    />
  );
}