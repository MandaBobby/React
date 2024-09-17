import { Outlet, Link} from "react-router-dom"

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">layout</Link>
          </li>
          <li>
            <Link to="/register">Registration</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;