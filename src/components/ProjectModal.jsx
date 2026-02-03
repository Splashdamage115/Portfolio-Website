import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import './ProjectModal.css'

const ProjectModal = ({ projectKey, projectData, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!projectData) return null

  const renderContent = (item) => {
    const elements = []

    if (item.Heading) {
      elements.push(<h3 key="heading">{item.Heading}</h3>)
    }

    if (item.Text) {
      elements.push(<p key="text">{item.Text}</p>)
    }

    if (item.Img) {
      elements.push(
        <div key="img" className="modal-image-container">
          <img
            src={item.Img.file}
            alt={item.Img.alt || 'Project image'}
            style={{
              width: item.Img.size?.width || 'auto',
              height: item.Img.size?.height || 'auto',
              maxWidth: '100%'
            }}
          />
        </div>
      )
    }

    if (item.Video) {
      elements.push(
        <div key="video" className="modal-video-container">
          <iframe
            src={item.Video.file}
            title="Project video"
            style={{
              width: item.Video.size?.width || '100%',
              height: item.Video.size?.height || '500px'
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    }

    if (item.Parallax) {
      elements.push(
        <div key="parallax" className="modal-parallax">
          <img
            src={item.Parallax.file}
            alt="Parallax background"
            style={{
              width: item.Parallax.size?.width || '100%',
              height: item.Parallax.size?.height || '500px',
              objectFit: 'cover'
            }}
          />
        </div>
      )
    }

    if (item.Button) {
      elements.push(
        <div key="button" className="modal-button-container">
          <a
            href={item.Button.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            {item.Button.Text}
          </a>
        </div>
      )
    }

    return elements
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>

          <div className="modal-body">
            {projectData.map((item, index) => (
              <div key={index} className="modal-section">
                {renderContent(item)}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal
