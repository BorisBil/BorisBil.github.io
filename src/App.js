import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './components/pages/About'
import Projects from './components/pages/Projects'
import Blog from './components/pages/Blog'
import {  TestBlog,
          ProceduralGeneration,
          GridBasedPathfinding }  from './components/pages/blogs/index'

function App() {
  return (
    <BrowserRouter>
    <div className = "container">
      <Routes>
        <Route path = "/" element = {<About />} />
        <Route path = "/projects" element = {<Projects />} />
        <Route path = "/blog" element = {<Blog />} />
        <Route path = "/testblog" element = {<TestBlog />} />
        <Route path = "/proceduralgeneration" element = {<ProceduralGeneration />} />
        <Route path = "/gridbasedpathfinding" element = {<GridBasedPathfinding />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App