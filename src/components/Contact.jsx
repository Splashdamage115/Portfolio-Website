import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'davidstrikaitis@gmail.com',
      link: 'mailto:davidstrikaitis@gmail.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+353 89 223 5566',
      link: 'tel:+353892235566'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'Splashdamage115',
      link: 'https://github.com/Splashdamage115'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://linkedin.com'
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Let's work together on your next project
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : '_self'}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="contact-card card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="contact-icon">{item.icon}</div>
              <h3>{item.label}</h3>
              <p>{item.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>Built with React, Vite, and Framer Motion</p>
          <p>© 2024 David Strikaitis. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
