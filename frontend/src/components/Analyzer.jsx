import { useState } from "react";
import axios from "axios";

export default function Analyzer() {
  const [link, setLink] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setData(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", {
        link,
      });

      setData(res.data);
    } catch (err) {
      setData({ error: "Backend not responding" });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center py-20">

      {/* INPUT BOX */}
      <div className="glass flex gap-3 p-3 rounded-2xl">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste product link..."
          className="bg-transparent px-4 py-3 w-[420px] outline-none"
        />

        <button
          onClick={analyze}
          className="bg-purple-600 hover:bg-purple-500 px-6 rounded-xl"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* RESULT */}
      {data && (
        <div className="mt-12 w-[700px] glass p-8 rounded-2xl">

          {data.error ? (
            <p className="text-red-400">{data.error}</p>
          ) : (
            <>
              <h2 className="text-3xl text-purple-400 glow">
                {data.product}
              </h2>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="glass p-3 rounded-lg">💰 {data.price}</div>
                <div className="glass p-3 rounded-lg">⭐ {data.rating}</div>
                <div className="glass p-3 rounded-lg">🧾 {data.reviews}</div>
              </div>

              <div className="mt-6 text-green-400">
                {data.recommendation}
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}