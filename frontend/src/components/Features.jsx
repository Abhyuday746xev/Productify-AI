import { motion } from "framer-motion";

export default function Features() {
  const items = [
    "AI Review Intelligence",
    "Pricing Trend Detection",
    "Smart Buy Prediction",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center px-10">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl text-center text-purple-400 font-bold"
      >
        Intelligence Layer
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 mt-20">

        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-2xl glass border border-purple-900/40"
          >
            <h3 className="text-xl text-white">{item}</h3>
            <p className="text-gray-400 mt-3">
              AI-driven insights from product behavior + reviews.
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}