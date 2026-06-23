import Hero from "../components/Hero";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Landing() {
  return (
    <div className="bg-black text-white overflow-x-hidden">

      <Hero />

      {/* FEATURES */}
      <section className="py-24 px-6 md:px-20" id="features">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            Why Productify AI
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {[
            {
              title: "AI Review Engine",
              desc: "Analyzes thousands of reviews to extract real sentiment signals."
            },
            {
              title: "Price Intelligence",
              desc: "Tracks pricing patterns and predicts best buying moments."
            },
            {
              title: "Smart Recommendations",
              desc: "Tells you whether a product is actually worth buying."
            }
          ].map((f, i) => (

            <motion.div
              key={i}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              transition={{ delay:i*0.15 }}
              viewport={{ once:true }}
              className="p-8 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-xl hover:-translate-y-3 hover:border-purple-500 transition"
            >

              <h3 className="text-xl text-purple-300 font-semibold">
                {f.title}
              </h3>

              <p className="text-gray-400 mt-4">
                {f.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>


      {/* WHAT PRODUCTIFY SOLVES */}

      <section className="relative py-24 px-6 md:px-20 overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-purple-600/15 blur-3xl rounded-full top-[-100px] left-[-100px]" />

        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />


        <div className="relative z-10 max-w-7xl mx-auto">

          

          <h2 className="text-5xl font-bold mt-5">

            What Does{" "}

            <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

              Productify AI

            </span>{" "}

            Solve?

          </h2>

          <p className="text-gray-400 mt-8 max-w-3xl text-lg leading-8">

            Productify AI helps users make smarter shopping decisions
            by analyzing products, reviews, pricing signals and customer
            sentiment instantly.

          </p>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
              {
                icon:"🔍",
                title:"Information Overload",
                desc:"AI summarizes important information."
              },
              {
                icon:"📈",
                title:"Price Tracking",
                desc:"Track whether prices are worth paying."
              },
              {
                icon:"💬",
                title:"Fake Reviews",
                desc:"Detect meaningful review sentiment."
              },
              {
                icon:"🎯",
                title:"Decision Fatigue",
                desc:"Get quick product recommendations."
              }
            ].map((card,i)=>(

              <div
                key={i}
                className="bg-[#111] border border-purple-500/20 p-8 rounded-3xl hover:-translate-y-3 hover:border-cyan-400 transition-all"
              >

                <div className="text-5xl">
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold mt-6">
                  {card.title}
                </h3>

                <p className="text-gray-400 mt-4 leading-7">
                  {card.desc}
                </p>

              </div>

            ))}

          </div>


          <div className="mt-20 rounded-[40px] bg-gradient-to-r from-purple-700 via-purple-600 to-cyan-600 p-10">

            <div className="grid lg:grid-cols-2 items-center gap-10">

              <div>

                <h3 className="text-4xl font-bold">
                  Why Productify AI matters
                </h3>

                <p className="mt-6 text-white/80 text-lg leading-8">

                  Users spend huge amounts of time comparing products,
                  reading reviews and checking prices.

                  Productify AI transforms this process into AI-powered
                  insights in seconds.

                </p>

              </div>

              <div className="flex justify-center">

                <img
                  src={logo}
                  alt="Productify"
                  className="w-[350px] object-contain drop-shadow-[0_0_50px_rgba(168,85,247,.8)]"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="py-28 text-center">

        <h2 className="text-4xl font-bold">
          Start analyzing smarter today
        </h2>

        <p className="text-gray-400 mt-5">
          Join the next generation of AI product intelligence
        </p>

        <a
          href="/app"
          className="inline-block mt-8 px-8 py-4 bg-purple-600 rounded-xl hover:bg-purple-500 transition"
        >
          Open Dashboard
        </a>

      </section>

    </div>
  );
}