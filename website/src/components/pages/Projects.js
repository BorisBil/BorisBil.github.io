import Layout from '../layouts/Layout'

import '../css/Projects.css'

function Projects() {
  return (
    <Layout>
      <div className = "project-wrapper">
        
        <div className = "project-box project-box-1">
          <div className = "project-image project-image-1">
            <a rel = "noreferrer noopener" href = "https://github.com/BorisBil/fantasy-tactics" target = "_blank">
              <img src = {require("../images/project-images/unity-project.PNG")} alt = "unity project"></img>
            </a>
          </div>
          <div className = "project-text project-text-1">
            <h1>Fantasy Tactics</h1>
            <p className = "summarization">
              This is an in progress turn-based fantasy strategy hybrid game that I have
              been developing in Unity. Features include a procedurally generated map, 
              pathfinding, attack calculations, a vision mechanic, and basic AI behaviors.
            </p>
          </div>
        </div>
        
        <div className = "project-box project-box-2">
          <div className = "project-image project-image-2">
            <a rel = "noreferrer noopener" href = "https://github.com/BorisBil/Operation-Spirit" target = "_blank">
              <img src = {require('../images/project-images/script-project.PNG')} alt = "script project"></img>
            </a>
          </div>
          <div className = "project-text project-text-2">
            <h1>Operation Spirit (FAF)</h1>
            <p className = "summarization">
              I designed and built a modded co-op campaign for the 2007 RTS game Supreme Commander using Lua. Documentation
              was created in order to assist others in the community that was behind keeping the multiplayer aspect
              of the game alive. The lightweight Lua language is used by the engine to essentially script every facet of 
              a campaign mission, and this was used to create new solo/coop experiences by the community.
            </p>
          </div>
        </div>
        
        <div className = "project-box project-box-3">
          <div className = "project-image project-image-3">
            <a rel = "noreferrer noopener" href = "https://github.com/camillac/CatBurglars" target = "_blank">
              <img src = {require('../images/project-images/multiplayer-project.PNG')} alt = "multiplayer project"></img>
            </a>
          </div>
          <div className = "project-text project-text-3">
            <h1>Catburglers.io</h1>
            <p className = "summarization">
              For my capstone project at Hunter, my group built a simple multiplayer IO game. We used Express and Websockets 
              to build out the back-end, and the web canvas game engine Phaser for the front-end. We supported up to four
              concurrent players per lobby, with one player acting as the host. 
            </p>
          </div>
        </div>
        
        <div className = "project-box project-box-4">
          <div className = "project-image project-image-4">
            <a rel = "noreferrer noopener" href = "https://github.com/BorisBil/Boris_Bilogur_Fall22" target = "_blank">
              <img src = {require('../images/project-images/game-engine-project.PNG')} alt = "game engine project"></img>
            </a>
          </div>
          <div className = "project-text project-text-4">
            <h1>Game Engine</h1>
            <p className = "summarization">
              This basic 2D game engine comes complete with hitbox detection based on image dimensions, rendering, 
              a canvas for drawing objects, and a developer interface.
            </p>
          </div>
        </div>
        
        <div className = "project-box project-box-5">
          <div className = "project-image project-image-5">
            <a rel = "noreferrer noopener" href = "https://github.com/BorisBil/WTStatistics" target = "_blank">
              <img src = {require('../images/project-images/python-project.PNG')} alt = "data science project"></img>
            </a>
          </div>
          <div className = "project-text project-text-5">
            <h1>War Thunder Discord Bot</h1>
            <p className = "summarization">
              I created a Discord bot that scraped a third party website for player statistics. It calculates
              session stats, and had a search function for specific vehicles. The bot displayed results in paginated
              tables embedded into Discord messages.
            </p>
          </div>
        </div>
        
        <div className = "project-box project-box-6">
          <div className = "project-image project-image-6">
            <a rel = "noreferrer noopener" href = "https://github.com/BorisBil/final-backend" target = "_blank">
              <img src = {require('../images/project-images/database-project.png')} alt = "data science project"></img>
            </a>
          </div>
          <div className = "project-text project-text-5">
            <h1>Postgres Database</h1>
            <h3>Javascript</h3>
            <p className = "summarization">
              My final project for Practical Web Development consisted of creating a fullstack CRUD web application
              connected to a local Postgres SQL database. I used Pg and Sequelize to create and seed the database, then used
              Express to create a local server to host the data. The front-end UI is built using React, and actions are communicated
              to the server by using Redux stores and thunks, with Axios serving as the HTTP client.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Projects;