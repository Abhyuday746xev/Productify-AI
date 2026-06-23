import { motion } from "framer-motion";

export default function Section({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-6xl mx-auto"
    >
      {children}
    </motion.section>
  );
}