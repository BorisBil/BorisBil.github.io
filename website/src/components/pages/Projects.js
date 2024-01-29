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
            <h1>Unity</h1>
            <h3>C#</h3>
            <p className = "summarization">
              This is my currently in progress turn-based fantasy strategy hybrid game that I have
              been developing for a couple of months. In it, I come across many questions regarding
              feature implementation and game design, and I answer them while also keeping in mind user 
              experience as well as functionality and optimization. Some features included are a
              procedurally generated map, pathfinding, attack calculations, a vision mechanic, and basic AI behaviors.
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
            <h1>Campaign Scripting</h1>
            <h3>Lua</h3>
            <p className = "summarization">
              The campaign scripting project involved learning what tools are available in an older 
              engine in an RTS game from 2007, with the help of other people. Documentation was created
              in order to assist others in the community that was behind keeping the multiplayer aspect of
              the game alive. The lightweight Lua language was used by the engine to essentially script almost
              every facet of a campaign mission, and this was used to create new solo/coop experiences by the community.
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
            <h1>Multiplayer IO Game</h1>
            <h3>Javascript</h3>
            <p className = "summarization">
              For my capstone project in Hunter, my group decided to build a simple multiplayer IO game.
              We used express and websockets to build out the back-end, and built the front-end on the popular
              Web Canvas game engine Phaser. Players host lobbies and join them through codes, up to a max of 4
              players per lobby. When the game starts, they get put through the gameloop with accurate server-side
              timekeeping, with the server also responsible for synchronizing all of the players.
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
            <h3>C++</h3>
            <p className = "summarization">
              Four years at Hunter taught me much about development using C++, since every programming class we 
              had used the language. This basic 2D game engine, complete with hitbox detection based on image dimensions,
              as well as rendering and a canvas for drawing objects, is my best project with C++ thus far.
              The Game Engine class navigated difficult obstacles when making such an engine, as well as complex
              math problems and their implementations into code.
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
            <h1>Discord Bot</h1>
            <h3>Python</h3>
            <p className = "summarization">
              A need in some communities for easy access to stats lead to my development of a python bot that used 
              webscraping to pick up statistics from a 3rd party site, that then processes the stats into a digestible 
              format. It calculates session stats, as well as provides a search function where you can either specify certain
              vehicles or search for all vehicles that share the input's content. The bot displays everything in tables and
              comes complete with pagination.
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
              connected to a local postgres sql database. I used Pg and Sequelize to create and seed the database, then used
              Express to create a local server to host the data. The front-end UI is built using React, and actions are communicated
              to the server by using Redux stores and thunks, as well as Axios for the http client.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Projects;