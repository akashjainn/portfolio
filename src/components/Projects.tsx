export default function Projects() {
  const projects = [
    {
      title: "StockSense",
      description: "A full-stack stock portfolio platform integrating the Alpaca API for live market data with enterprise-grade user experience.",
      longDescription: "Built a comprehensive stock trading platform with real-time market data, portfolio management, and interactive charts. Features secure user authentication, trade history tracking, and responsive design for optimal user experience across devices.",
      tech: ["Python", "Flask", "React", "PostgreSQL", "Docker", "Alpaca API", "Vercel"],
      features: [
        "Live market data integration with Alpaca API",
        "Real-time dashboards and interactive charts",
        "Secure portfolio and trade history management",
        "Containerized deployment with CI/CD pipelines"
      ],
      status: "In Development",
      period: "Aug 2025 – Present",
  github: "https://github.com/akashjainn/stocksense",
  site: "https://stocksense-taupe.vercel.app/",
  demo: "#"
    },
    {
      title: "Electronic ARTrium",
      description: "An interactive art installation using computer vision and motion tracking to create dynamic responses to participants' presence and movement.",
      longDescription: "Developed an immersive interactive exhibit that combines real-time 3D pose detection with speech recognition to animate both digital and mechanical characters, creating a seamless interactive experience for museum visitors.",
      tech: ["Python", "Unity", "Blender", "OpenCV", "Mediapipe", "DepthAI", "NumPy"],
      features: [
        "Real-time 3D pose detection with USB and depth cameras",
        "Speech and text-to-gesture control software",
        "Dynamic response to participant movement",
        "Integration of video and mechatronic characters"
      ],
  status: "Ongoing",
      period: "Aug 2024 – Present",
  github: "#",
  demo: "https://electronicartrium.ece.gatech.edu/"
    }
  ]

  return (
  <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary-red mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            A collection of projects showcasing my experience in full-stack development, 
            creative technology, and scalable system design.
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{project.period}</p>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary-red mb-3">Key Features</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-red mr-2 mt-1">•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary-red mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200 hover:border-primary-red transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {project.github !== "#" && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary-red text-white px-6 py-2 rounded-lg hover:bg-dark-red transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      View Code
                    </a>
                  )}
                  {project.site && (
                    <a 
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border-2 border-primary-red text-primary-red px-6 py-2 rounded-lg hover:bg-primary-red hover:text-white transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Site
                    </a>
                  )}
          {project.demo !== "#" && (
                    <a 
                      href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
                      className="flex items-center gap-2 border-2 border-primary-red text-primary-red px-6 py-2 rounded-lg hover:bg-primary-red hover:text-white transition-colors font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
