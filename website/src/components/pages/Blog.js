import { Link } from 'react-router-dom'

import Layout from '../layouts/Layout'
import '../css/Blog.css'

function Blog() {
    return (
      <Layout>
        <div className = "blog-wrapper">
            <h1 className = "title">Blog Posts about Projects and Problem Solving</h1>
            <table>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/proceduralgeneration'>Procedural Map Generation Using Cubes</Link></td>
                    <td className = "Project">Unity Game Development</td>
                    <td className = "Language">C#</td>
                </tr>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/TestBlog'>Grid Based A* Pathfinding</Link></td>
                    <td className = "Project">Unity Game Development</td>
                    <td className = "Language">C#</td>
                </tr>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/TestBlog'>Scripting Missions Using Older Documentation</Link></td>
                    <td className = "Project">Campaign Solo/Coop Scripting</td>
                    <td className = "Language">Lua</td>
                </tr>
                <tr>
                    <td className = "Link"><Link className = "routerlink" to = '/TestBlog'>Grid Based Ranged Attack Calculations</Link></td>
                    <td className = "Project">Unity Game Development</td>
                    <td className = "Language">C#</td>
                </tr>
            </table>
        </div>
      </Layout>
    )
  }
  
  export default Blog;