'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
  const sections = ['hero', 'about', 'experience', 'projects', 'playground', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'About', href: '#about', delay: 0.1 },
    { name: 'Experience', href: '#experience', delay: 0.2 },
    { name: 'Projects', href: '#projects', delay: 0.3 },
    { name: 'Playground', href: '#playground', delay: 0.35 },
    { name: 'Contact', href: '#contact', delay: 0.4 },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-gray-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl font-bold gradient-text font-mono">
                &lt;AJ /&gt;
              </div>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-primary-red"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors magnetic ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary-red'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary-red/20 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
              
              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="magnetic px-6 py-2 bg-primary-red text-white font-semibold rounded-lg hover:bg-dark-red transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <motion.span
                className={`block h-0.5 w-6 bg-white mt-1 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <motion.span
                className={`block h-0.5 w-6 bg-white mt-1 transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-md border-l border-gray-800 z-40 md:hidden"
            >
              <div className="p-8 pt-24">
                <div className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block text-2xl font-medium text-gray-300 hover:text-primary-red transition-colors"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center">
                        <span className="text-primary-red mr-4 font-mono text-sm">
                          0{index + 1}.
                        </span>
                        {item.name}
                      </div>
                    </motion.a>
                  ))}
                  
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    className="block mt-8 px-6 py-3 bg-primary-red text-white font-semibold rounded-lg text-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Download Resume
                  </motion.a>
                </div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-800"
                >
                  <div className="space-y-4 text-sm text-gray-400">
                    <a href="mailto:akashjain1311@gmail.com" className="block hover:text-primary-red transition-colors">
                      akashjain1311@gmail.com
                    </a>
                    <a href="tel:678-665-0467" className="block hover:text-primary-red transition-colors">
                      (678) 665-0467
                    </a>
                    <div className="flex space-x-4 pt-4">
                      <a href="https://github.com/akashjainn" target="_blank" className="text-gray-400 hover:text-primary-red transition-colors">
                        GitHub
                      </a>
                      <a href="https://www.linkedin.com/in/akash-jain-687673209/" target="_blank" className="text-gray-400 hover:text-primary-red transition-colors">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
