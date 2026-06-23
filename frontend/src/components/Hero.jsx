import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* Background glows */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8 }}
            >

              <p className="text-purple-400 tracking-[5px] mb-4 uppercase text-sm">
                AI Powered Product Intelligence
              </p>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">

                Make smarter buying decisions with{" "}

                <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  Productify AI
                </span>

              </h1>

              <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">

                Analyze marketplace products instantly using AI.
                Get insights from reviews, ratings, pricing behavior,
                and customer sentiment in real time.

              </p>

            </motion.div>


            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >

              <Link
                to="/app"
                className="px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg shadow-purple-600/30"
              >
                Open Dashboard
              </Link>

              <a
                href="#features"
                className="px-7 py-4 rounded-xl border border-purple-500 text-purple-300 hover:bg-purple-500/10 transition"
              >
                Explore Features
              </a>

            </motion.div>


            <div className="mt-12 flex gap-8 text-sm text-gray-500">

              

              

            </div>

          </div>


          {/* RIGHT SIDE IMAGE */}

          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1 }}
            className="flex justify-center"
          >

            <img
              src={logo}
              alt="Productify Logo"
              className="w-[550px] object-contain drop-shadow-[0_0_40px_rgba(168,85,247,.6)]"
            />

          </motion.div>

        </div>

      </div>

    </div>
  );
}