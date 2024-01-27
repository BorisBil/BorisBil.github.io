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
            Hello! Welcome to my personal website.
          </p>
          <p>
            I am a recent graduate from Hunter College with a BA in Computer Science. I have spent
            the last 5-6 years working on my development skills as well as interpersonal connections.
          </p>
          <p>
            I am proficient in Lua, Python, C++, C#, Javascript, and SQL due to my projects using these languages in
            several different spaces. I have work involving Data Science, Databases, Web Development, Game Development,
            Game Engine Development, and Multiplayer Game Development.
          </p>
          <p>
            I have also worked in IT and taken apart as well as built custom computers, be they for myself,
            friends, or for customers.
          </p>
          <p>
            Working with other people taught me to be able to explain problems and their solutions efficiently
            as well as being able to combine efforts to create a product with bigger scope than I could ever develop 
            alone for.
          </p>
          <p>
            Come check out what projects I have done and in progress at this moment in the projects tab!
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About;