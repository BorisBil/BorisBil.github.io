import Layout from '../layouts/Layout'
import '../css/Landing.css'

function Landing() {
  return (
    <Layout>
    <div className = "wrapper">
      <div className = "big-box big-box-1">
        <div className = "image-box image-box-1">
          <img src = {require("../images/landing-images/unity.PNG")} alt = "unity editor"></img>
        </div>
        <div className = "text-box text-box-1">
          <p className = "descriptor">
            I have experience with the Unity editor as well as usage of the powerful C# language
            to solve complex problems
          </p>
          <p className = "descriptor">
            Interesting mathematical issues and their implementation into code is key in understanding
            the game development process, and this skill is applicable to any other software development
            field
          </p>
        </div>
      </div>
      <div className = "big-box big-box-2">
        <div className = "text-box text-box-2">
          <p className = "descriptor">
            Years of study for my degree has lead me to proficiency in C++, culminating in this 2D
            game engine being created, complete with hitboxes and rendering
          </p>
          <p className = "descriptor">
            Optimization and good performance is critical when making engines, as well as understanding the 
            math that is behind all of its processes
          </p>
        </div>
        <div className = "image-box image-box-2">
          <img src = {require("../images/landing-images/game-engine.PNG")} alt = "unity editor"></img>
        </div>
      </div>
      <div className = "big-box big-box-3">
        <div className = "image-box image-box-3">
          <img src = {require("../images/landing-images/script.PNG")} alt = "unity editor"></img>
        </div>
        <div className = "text-box text-box-3">
          <p className = "descriptor">
            Dabbling in scripting taught me much about reading documentation and understanding code
            not written by yourself, as well as the importance of writing good documentation yourself
          </p>
          <p className = "descriptor">
            This Lua project came about by deciphering the engine of an older RTS game and creating a
            new co-op campaign mission using information gleaned from the engine as well as other people
            involved in the project
          </p>
        </div>
      </div>
      <div className = "big-box big-box-4">
        <div className = "text-box text-box-4">
          <p className = "descriptor">
            I have also created projects related to web design, databases, online games, and data science
          </p>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Landing