'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export default function About() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const skillsRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const isInView = useInView(textRef, { once: true })
  const skillsInView = useInView(skillsRef, { once: true })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skills = {
    "Languages": [
      { name: "JavaScript", level: 95, color: "#F7DF1E" },
      { name: "TypeScript", level: 90, color: "#3178C6" },
      { name: "Python", level: 92, color: "#3776AB" },
      { name: "Java", level: 88, color: "#ED8B00" },
      { name: "SQL", level: 85, color: "#336791" },
      { name: "C++", level: 80, color: "#00599C" }
    ],
    "Frontend": [
      { name: "React", level: 95, color: "#61DAFB" },
      { name: "Next.js", level: 90, color: "#000000" },
      { name: "Angular", level: 85, color: "#DD0031" },
      { name: "TailwindCSS", level: 92, color: "#06B6D4" },
      { name: "Three.js", level: 75, color: "#000000" }
    ],
    "Backend": [
      { name: "Node.js", level: 90, color: "#339933" },
      { name: "Spring Boot", level: 85, color: "#6DB33F" },
      { name: "Flask", level: 82, color: "#000000" },
      { name: "Express", level: 88, color: "#000000" },
      { name: "MongoDB", level: 80, color: "#47A248" }
    ],
    "Cloud & DevOps": [
      { name: "AWS", level: 85, color: "#FF9900" },
      { name: "Azure", level: 80, color: "#0078D4" },
      { name: "Docker", level: 88, color: "#2496ED" },
      { name: "Kubernetes", level: 75, color: "#326CE5" },
      { name: "CI/CD", level: 82, color: "#FF0000" }
    ]
  }

  const achievements = [
    { metric: "3.5", label: "GPA at Georgia Tech", icon: "🎓" },
    { metric: "2M+", label: "Monthly Messages Handled", icon: "💬" },
    { metric: "99.98%", label: "System Uptime Achieved", icon: "⚡" },
    { metric: "35%", label: "Latency Reduction", icon: "🚀" },
    { metric: "22%", label: "Engagement Increase", icon: "📈" },
    { metric: "4+", label: "Years of Experience", icon: "⏱️" }
  ]

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute top-20 right-20 w-72 h-72 bg-primary-red/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]) }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-dark-red/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-primary-red to-dark-red mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Passionate about creating innovative solutions that bridge the gap between 
            cutting-edge technology and real-world impact.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Story Section */}
          <motion.div
            ref={textRef}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                My Journey in <span className="text-primary-red">Tech</span>
              </h3>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  I&apos;m a Computer Science student at <span className="text-primary-red font-semibold">Georgia Institute of Technology</span> 
                  with an unwavering passion for building software that makes a difference. My journey began with 
                  curiosity about how technology shapes our world, and has evolved into a mission to create 
                  scalable, innovative solutions.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  During my internship at <span className="text-primary-red font-semibold">State Farm</span>, I developed 
                  scalable chat systems that serve over 2 million monthly users, achieving 99.98% uptime and 
                  reducing response latency by 35%. This experience taught me the importance of building 
                  systems that not only work, but work exceptionally well at scale.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Beyond traditional software development, I&apos;m fascinated by the intersection of technology 
                  and creativity. My projects range from interactive art installations using computer vision 
                  to predictive analytics for urban planning. I believe the best solutions come from 
                  understanding both the technical possibilities and human needs.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-6"
              >
                <h4 className="text-xl font-semibold text-white mb-4">What Drives Me</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Problem Solving",
                    "Innovation",
                    "Scalability",
                    "User Experience",
                    "Clean Code",
                    "Team Collaboration"
                  ].map((value, index) => (
                    <motion.div
                      key={value}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <div className="w-2 h-2 bg-primary-red rounded-full" />
                      <span className="text-gray-300 font-medium">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive Skills Visualization */}
          <motion.div
            ref={skillsRef}
            className="space-y-8"
          >
            <motion.h3
              className="text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: 50 }}
              animate={skillsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Technical <span className="text-primary-red">Arsenal</span>
            </motion.h3>

            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-xl font-semibold text-primary-red font-mono">
                  {category}
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {skillList.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.2 + index * 0.1 }}
                      className="group relative p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-primary-red/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className="text-sm text-gray-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={skillsInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.5, delay: categoryIndex * 0.2 + index * 0.1 + 0.5 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Key <span className="text-primary-red">Achievements</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700 hover:border-primary-red/50 transition-all duration-300 text-center"
              >
                <motion.div
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {achievement.icon}
                </motion.div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-red mb-2 font-mono">
                  {achievement.metric}
                </div>
                <div className="text-sm text-gray-400 leading-tight">
                  {achievement.label}
                </div>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-primary-red/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
