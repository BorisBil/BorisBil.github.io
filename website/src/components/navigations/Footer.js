import React from 'react'

import '../css/Footer.css'

class Footer extends React.Component {
  render() {
    return(
      <div className = "footer">
        <div className = "divider"></div>
        <div className = "link-container">
          <div className = "logo-box logo-box-1">
            <a rel="noreferrer noopener" href = "https://www.linkedin.com/in/boris-bilogur-256741226/" target = "_blank">
              <img className = "linkedin" src = {require("../images/linkedin.jpg")} alt = "linked-in"></img>
            </a>
          </div>
          <div className = "logo-box logo-box-2">
            <a rel="noreferrer noopener" href = "https://github.com/BorisBil" target = "_blank">
              <img className = "github" src = {require("../images/github.jpg")} alt = "linked-in"></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;