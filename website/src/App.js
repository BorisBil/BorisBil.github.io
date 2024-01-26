import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './components/pages/About'
import Landing from './components/pages/Landing'
import Projects from './components/pages/Projects'

function App() {
  return (
    <BrowserRouter>
    <div className = "container">
      <Routes>
        <Route path = "/" element = {<Landing />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/projects" element = {<Projects />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App