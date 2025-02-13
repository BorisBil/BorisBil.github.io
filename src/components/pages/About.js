import Layout from '../layouts/Layout'

import '../css/About.css'

function About() {
  return (
    <Layout>
      <div className = "about-wrapper">
        <h1 className = "about-title">Personal Blog</h1>
        <div className = "portrait-box">
          <img src = {require("../images/miscal/me.jpg")} alt = "unity editor"></img>
        </div>
        <div className = "text-box">
          <p>
            Welcome to my personal website. I am a  graduate from Hunter College with a BA in Computer Science. 
          </p>
          <p>
            I am proficient in Lua, Python, C++, C#, JavaScript, and SQL. I have done work in Data Science, Databases, Web Development, Game Development, and
            Game Engine Development.
          </p>
          <p>
            I have also worked in IT and have experience in building PCs.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About;