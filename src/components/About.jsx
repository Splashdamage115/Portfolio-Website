import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const aboutContent = [
    {
      title: "Languages & Skills",
      description: "Vast experience in C/C++, Python, JavaScript (HTML/CSS), Assembly, and other languages. Game development and software development specialist.",
      icon: "💻"
    },
    {
      title: "Passion for Game Design",
      description: "Award-winning game designer with multiple game awards. Continuously researching and creating in game design, programming, and art.",
      icon: "🎮"
    },
    {
      title: "Education",
      description: "Studying Computer Games Development at Setu Carlow with high average grades. Previous computer science background and extensive self-study.",
      icon: "🎓"
    },
    {
      title: "Full Stack Developer",
      description: "Built this entire website from scratch using modern React framework, demonstrating full-stack capabilities and modern web development skills.",
      icon: "🚀"
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Passionate developer with a focus on creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="about-grid">
          {aboutContent.map((item, index) => (
            <motion.div
              key={index}
              className="about-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="about-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="code-showcase"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img
            src="/src/assets/imgs/CodeScreen.jpg"
            alt="Code example"
            className="code-image"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default About
