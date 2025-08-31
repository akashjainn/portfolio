"use client"
import { motion } from 'framer-motion'

export default function Playground() {
  return (
    <section id="playground" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Playground</h2>
          <div className="w-24 h-1 bg-primary-red mx-auto"></div>
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
            Try my Game Boy homebrew right in your browser.
          </p>
        </div>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-gray-800 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-2">Adventure Time (Game Boy)</h3>
              <p className="text-gray-400 mb-6">
                Play my Game Boy game in-browser using an emulator. For best performance, open in a new tab.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://binji.github.io/gbemu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary-red text-white px-6 py-3 rounded-lg hover:bg-dark-red transition-colors font-medium"
                >
                  Open Web Emulator
                </a>
                <a
                  href="https://github.com/akashjainn/adventureTimeGame"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-primary-red text-primary-red px-6 py-3 rounded-lg hover:bg-primary-red hover:text-white transition-colors font-medium"
                >
                  View Game Repo
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Tip: Use the web emulator link and load your ROM from the repository. You can also try <a className="text-primary-red hover:underline" href="https://taisel.github.io/GameBoy-Online/" target="_blank" rel="noopener noreferrer">GameBoy-Online</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
