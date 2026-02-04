import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import timelineData from '../data/timeline.json'
import projectsData from '../data/projects.json'
import ProjectModal from './ProjectModal'
import './Timeline.css'

const Timeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = timelineData.info

  const openProject = (projectName) => {
    setSelectedProject(projectName)
  }

  return (
    <section id="timeline" className="timeline-section">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Project <span className="gradient-text">Timeline</span>
          </h2>
          <p className="section-subtitle">
            A chronological journey through my game development experience
          </p>
        </motion.div>

        <div className="timeline">
          <div className="timeline-line"></div>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openProject(project.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="timeline-content card">
                <div className="timeline-image">
                  <img src={project.img} alt={project.displayName} />
                </div>
                <div className="timeline-info">
                  <span className="timeline-date">{project.date}</span>
                  <h3>{project.displayName}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
              <div className="timeline-dot"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && projectsData[selectedProject] && (
        <ProjectModal
          projectKey={selectedProject}
          projectData={projectsData[selectedProject]}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default Timeline
