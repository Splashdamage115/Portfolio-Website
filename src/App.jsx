import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'timeline', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 3

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <div className="app">
        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Timeline />
          <Contact />
        </main>
      </div>
    </Router>
  )
}

export default App
