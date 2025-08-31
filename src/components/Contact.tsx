export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Let&apos;s Connect</h2>
        <div className="w-24 h-1 bg-primary-red mx-auto mb-8"></div>
        
        <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
          I&apos;m always interested in discussing new opportunities, innovative projects, 
          and collaborations. Let&apos;s build something amazing together!
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <a 
            href="mailto:akashjain1311@gmail.com"
            className="group p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-primary-red mb-4">
              <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors">
              akashjain1311@gmail.com
            </p>
          </a>

          {/* Phone */}
          <a 
            href="tel:678-665-0467"
            className="group p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-primary-red mb-4">
              <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors">
              (678) 665-0467
            </p>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/akash-jain-687673209/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-primary-red mb-4">
              <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">LinkedIn</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors">
              Connect with me
            </p>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-dark-red transition-colors"
          >
            Download Resume
          </a>
          <a 
            href="https://github.com/akashjainn"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary-red text-primary-red px-8 py-3 rounded-lg font-semibold hover:bg-primary-red hover:text-white transition-colors"
          >
            View GitHub
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-gray-400">
            © 2025 Akash Jain. Built with Next.js and TailwindCSS.
          </p>
        </div>
      </div>
    </section>
  )
}
