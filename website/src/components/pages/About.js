import Layout from '../layouts/Layout'

import '../css/About.css'

function About() {
  return (
    <Layout>
      <div className = "about-wrapper">
        <div className = "portrait-box">
          <img src = {require("../images/miscal/me.jpg")} alt = "unity editor"></img>
        </div>
        <div className = "text-box">
          <p>
            Hello! Welcome to my personal website. I am a recent graduate from Hunter College with a BA in Computer Science. 
          </p>
          <p>
            I am proficient in Lua, Python, C++, C#, Javascript, and SQL. I have work involving Data Science, Databases, Web Development, Game Development, and
            Game Engine Development.
          </p>
          <p>
            I have also worked in IT with experience in building PCs, be they for myself,
            friends, or for customers.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About;