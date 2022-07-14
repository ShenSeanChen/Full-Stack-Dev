import {Link, useMatch, useResolvedPath} from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">React Sean</Link>
            <ul>
                <CustomLink to="/reacthooks">React Hooks</CustomLink>
                {/* <li className="active"><a href="/reacthooks">React Hooks</a></li> */}
                <CustomLink to="/pokemonlisttab">Pokemon List</CustomLink>
                <CustomLink to="/calculator">Calculator</CustomLink>
                <CustomLink to="/facetracker">Face Tracker</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({to,children, ...props}) {
    // const path = window.location.pathname
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}