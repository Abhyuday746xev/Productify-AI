import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const currentProgress =
        (window.scrollY / totalHeight) * 100;

      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-[9999]">

      <div
        className="h-full rounded-r-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(to right,#a855f7,#06b6d4)",
          boxShadow:
            "0 0 20px rgba(168,85,247,.8), 0 0 30px rgba(6,182,212,.5)",
        }}
      />

    </div>
  );
}