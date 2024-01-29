import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function Header() {
  return (
    <nav className = "nav">
      <ul>
        <CustomLink to = "/"> About </CustomLink>
        <CustomLink to = "/projects"> Projects </CustomLink>
        <CustomLink to = "/blog"> Blog </CustomLink>
      </ul>
      <div className = "name">
        <h3>Boris Bilogur</h3>
      </div> 
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}