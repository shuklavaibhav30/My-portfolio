import './index.css'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Skills    from './components/Skills'
import Projects  from './components/Projects'
import Timeline  from './components/Timeline'

export default function App() {
  return (
    <main style={{ background: '#07070e' }}>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Timeline />
    </main>
  )
}