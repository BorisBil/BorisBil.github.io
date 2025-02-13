import { Link } from 'react-router-dom'

import Layout from '../layouts/Layout'
import '../css/Blog.css'

function Blog() {
    return (
      <Layout>
        <div className = "blog-wrapper">
            <h1 className = "title">Blog Posts</h1>
            <table>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/proceduralgeneration'>Procedural TileMap Generation</Link></td>
                    <td className = "Project">Unity Game Development</td>
                    <td className = "Language">C#</td>
                </tr>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/gridbasedpathfinding'>Grid Based A* Pathfinding</Link></td>
                    <td className = "Project">Unity Game Development</td>
                    <td className = "Language">C#</td>
                </tr>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/gridbasedattacks'>Grid Based Ranged Attack Calculations</Link></td>
                    <td className = "Project">Unity Game Development</td>
                    <td className = "Language">C#</td>
                </tr>
            </table>
        </div>
      </Layout>
    )
  }
  
  export default Blog;