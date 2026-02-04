import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectModal from './ProjectModal'
import projectsData from '../data/projects.json'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  // Get featured projects
  const featuredProjects = [
    { 
      key: 'StarBean', 
      name: 'Star Bean',
      description: 'Award-winning space barista simulator - Best UI & Best Music at 2024 Games Fleadh',
      image: '/imgs/StarBeanPoster.png',
      tags: ['Award Winner', 'Simulator', 'Unity']
    },
    { 
      key: 'UIProject', 
      name: 'Time Void',
      description: 'Multiplayer strategy game challenging mind and cunning',
      image: '/imgs/TimeVoidScreenshot.png',
      tags: ['Strategy', 'Multiplayer', 'PvP']
    },
    { 
      key: 'BlindWatchers', 
      name: 'Blind Watchers',
      description: 'Stealth game with complex detection systems and particle effects',
      image: '/imgs/BlindWatchersScreenshot.png',
      tags: ['Stealth', 'Puzzle', 'Action']
    },
    { 
      key: 'TankGame', 
      name: 'Tank Game',
      description: 'Feature-rich tank game with split-screen multiplayer',
      image: '/imgs/TankGameScreenshot.png',
      tags: ['Action', 'Multiplayer', 'Arcade']
    },
    { 
      key: 'DungeonAdventure', 
      name: 'Dungeon Adventure',
      description: 'Complex game with multiple mini-games and puzzles',
      image: '/imgs/DungeonAdventureProject.png',
      tags: ['Adventure', 'Puzzle', 'RPG']
    },
    { 
      key: 'ZombieShooter', 
      name: 'Zombie Shooter',
      description: 'Wave-based survival with explosive enemies',
      image: '/imgs/OriginalZombieShooterScreenShot.png',
      tags: ['Action', 'Survival', 'Shooter']
    }
  ]

  const openProject = (projectKey) => {
    setSelectedProject(projectKey)
  }

  return (
    <section id="projects" className="projects">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Showcasing award-winning games and innovative projects
          </p>
        </motion.div>

        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.key}
              className="project-card card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openProject(project.key)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                  <span className="view-more">View Details</span>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="view-all-container"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            className="btn"
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Full Timeline
          </button>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          projectKey={selectedProject}
          projectData={projectsData[selectedProject]}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default Projects
