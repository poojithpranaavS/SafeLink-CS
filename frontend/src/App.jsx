import { motion } from "framer-motion";

export default function App() {

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px]" />

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[120px]" />

      </div>

      {/* NAVBAR */}

      <nav className="relative z-10 flex justify-between items-center px-12 py-8">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl shadow-2xl shadow-blue-500/40">

            🛡️

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-wide">
              SecureShield
            </h1>

            <p className="text-slate-400 text-sm">
              Enterprise Verification Gateway
            </p>

          </div>

        </div>

        <div className="hidden md:flex gap-10 text-slate-300">

          <a href="#">Features</a>
          <a href="#">Security</a>
          <a href="#">Infrastructure</a>
          <a href="#">Analytics</a>

        </div>

        <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30">

          Secure Access

        </button>

      </nav>

      {/* HERO */}

      <section className="relative z-10 px-12 pt-20 pb-32">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-blue-200">
                Protected Session Enabled
              </span>

            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-10">

              Advanced

              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

                {" "}Secure{" "}

              </span>

              Verification Infrastructure

            </h1>

            <p className="text-slate-400 text-xl leading-9 mb-12 max-w-2xl">

              Multi-layer encrypted verification pipeline with AI-enhanced
              integrity analysis, secure device authentication, and
              enterprise-grade session protection.

            </p>

            {/* LEFT BUTTONS */}

            <div className="flex flex-wrap gap-6">

              <a href="/dashboard">

                <button className="px-8 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all text-lg shadow-2xl shadow-blue-500/30">

                  Open Dashboard

                </button>

              </a>

              <button className="px-8 py-5 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all text-lg">

                View Infrastructure

              </button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-6 mt-20">

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

                <h2 className="text-4xl font-bold mb-2">
                  256-Bit
                </h2>

                <p className="text-slate-400">
                  Encryption
                </p>

              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

                <h2 className="text-4xl font-bold mb-2">
                  99.99%
                </h2>

                <p className="text-slate-400">
                  Threat Detection
                </p>

              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

                <h2 className="text-4xl font-bold mb-2">
                  AI
                </h2>

                <p className="text-slate-400">
                  Verification Engine
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >

            <div className="absolute inset-0 bg-blue-500/20 blur-[100px]" />

            <div className="relative rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-[0_0_80px_rgba(59,130,246,0.25)]">

              <div className="flex items-center justify-between mb-10">

                <div>

                  <h2 className="text-3xl font-bold">
                    Verification Gateway
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Secure Session Authorization
                  </p>

                </div>

                <div className="w-5 h-5 rounded-full bg-green-400 animate-pulse" />

              </div>

              {/* TERMINAL */}

              <div className="rounded-3xl bg-[#020617] border border-slate-800 p-6 mb-8 font-mono text-sm">

                <p className="text-green-400 mb-3">
                  ✓ Secure gateway initialized
                </p>

                <p className="text-cyan-400 mb-3">
                  ✓ Device integrity verified
                </p>

                <p className="text-blue-400 mb-3">
                  ✓ Encrypted session established
                </p>

                <p className="text-yellow-400">
                  → Awaiting secure authorization...
                </p>

              </div>

              {/* FORM */}

              <div className="space-y-6">

                <div>

                  <label className="block mb-3 text-slate-300">
                    Email Address
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full p-5 rounded-2xl bg-[#0f172a] border border-slate-700 focus:border-blue-500 outline-none text-white"
                  />

                </div>

                <div>

                  <label className="block mb-3 text-slate-300">
                    Verification ID
                  </label>

                  <input
                    type="password"
                    placeholder="Secure verification code"
                    className="w-full p-5 rounded-2xl bg-[#0f172a] border border-slate-700 focus:border-blue-500 outline-none text-white"
                  />

                </div>

                {/* RIGHT BUTTON */}

                <a
                  href="http://127.0.0.1:5000"
                  target="_blank"
                >

                  <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition-all text-lg font-semibold shadow-2xl shadow-blue-500/30">

                    Continue Securely

                  </button>

                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </div>

  );
}