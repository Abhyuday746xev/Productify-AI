import { motion } from "framer-motion";

export default function AILoading() {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      {/* spinning loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full"
      />

      {/* text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-purple-300 mt-4 text-sm"
      >
        AI is analyzing product data...
      </motion.p>

    </div>
  );
}