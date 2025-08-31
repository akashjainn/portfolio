export default function Experience() {
  const experiences = [
    {
      company: "State Farm",
      position: "Software Engineer Intern",
      location: "Bloomington, IL",
      period: "May 2025 - Aug 2025",
      description: "Enterprise Technology Division",
      achievements: [
        "Designed and deployed a scalable Angular chat widget integrated with an AWS Lambda API, reducing response latency by ~35% and increasing session engagement by 22%",
        "Built a fault-tolerant Amazon Connect wrapper with persistent WebSockets, message delivery confirmation, and CDN-based fallback, achieving 99.98% uptime across 2M+ monthly messages",
        "Modernized legacy services by migrating to Java Spring Boot microservices on Red Hat OpenShift with Azure Entra ID OAuth2 and Docker-based CI/CD, improving scalability and reducing infrastructure costs"
      ],
      tech: ["Angular", "AWS Lambda", "Java Spring Boot", "Docker", "Azure", "WebSockets"]
    },
    {
      company: "Tours Limited",
      position: "UX/UI Intern",
      location: "Duluth, GA",
      period: "May 2024 – Aug 2024",
      description: "",
      achievements: [
        "Built the company website's responsive and interactive frontend in React, implementing reusable components and ensuring cross-browser compatibility for an optimized user experience",
        "Utilized AWS services for continuous maintenance, monitoring, and optimization of web applications to ensure high availability, scalability, and performance"
      ],
      tech: ["React", "AWS", "JavaScript", "CSS"]
    },
    {
      company: "Holt Consulting",
      position: "Plans Assistant",
      location: "Duluth, GA",
      period: "Aug 2022 – Apr 2023",
      description: "",
      achievements: [
        "Built predictive traffic flow models for intersection expansion, analyzing traffic and environmental data to recommend lane additions"
      ],
      tech: ["Data Analysis", "Predictive Modeling"]
    },
    {
      company: "Patel Plastic Surgery",
      position: "Medical Intern",
      location: "East Cobb, GA",
      period: "Jun 2021 – Aug 2021",
      description: "",
      achievements: [
        "Developed an itemized inventory management system using a SQL database, improving data accuracy and operational efficiency for tracking thousands of medical supplies"
      ],
      tech: ["SQL", "Database Management"]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <div className="w-24 h-1 bg-primary-red mx-auto"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.position}</h3>
                  <h4 className="text-xl text-primary-red font-semibold">{exp.company}</h4>
                  {exp.description && (
                    <p className="text-gray-600 mt-1">{exp.description}</p>
                  )}
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-gray-600 font-medium">{exp.period}</p>
                  <p className="text-gray-500">{exp.location}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary-red mr-3 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
