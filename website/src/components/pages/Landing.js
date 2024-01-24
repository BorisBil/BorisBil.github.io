import Layout from '../layouts/Layout'
import './Landing.css'

var text = require('../text/test.html')

function Landing() {
  return (
    <Layout>
    <div class = "wrapper">
      <div class = "big-box big-box-1">
        <div class = "image-box image-box-1">
          <img src = {require("../images/unity.PNG")} alt = "unity editor"></img>
        </div>
        <div class = "text-box text-box-1">
          <embed src = {text}></embed>
        </div>
      </div>
      <div class = "big-box big-box-2">
        <div class = "text-box text-box-1">
          Landing
        </div>
        <div class = "image-box image-box-1">
          <img src = {require("../images/game-engine.PNG")} alt = "unity editor"></img>
        </div>
      </div>
      <div class = "big-box big-box-3">
        <div class = "image-box image-box-1">
          <img src = {require("../images/script.PNG")} alt = "unity editor"></img>
        </div>
        <div class = "text-box text-box-1">
          Landing
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Landing