import { Link } from "react-router-dom";

function FullStackDevelopment() {
  return (
      <div className = "about-wrapper">
        <h1>Currently under construction</h1>
        <img src = {require('../../images/blog-images/download.jpeg')} alt = 'under-construction'></img>
        <Link to = {`/blog`}>
          <h5>Back</h5>
        </Link>
      </div>
    )
}

export default FullStackDevelopment;