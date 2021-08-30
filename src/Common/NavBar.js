import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../Services/auth/AuthService";
import { signOut } from "../Services/auth/AuthService";
const isActive = (history, path) => {
  if (history.location.pathname === path) return true;
  return false;
};
const NavBar = ({ history }) => {
  const signOutUser = () => {
    signOut(() => history.push("/"));
  };
  return (
    <div style={{ backgroundColor: "#faf8f3" }} className="pt-3 px-3 mt-5 ">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            befriend
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto  mb-2 mb-lg-0">
              <li className="nav-item mx-4">
                <Link
                  className={
                    isActive(history, "/") ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link
                  className={
                    isActive(history, "/show-community")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/show-community"
                >
                  Community
                </Link>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link" href="#">
                  Workshop
                </a>
              </li>
            </ul>
            <div className="d-flex">
              {(!isAuthenticated() && (
                <div>
                  <Link
                    style={{ borderColor: "#faf8f3" }}
                    className="btn btn-outline-dark mx-3"
                    to="/signIn"
                  >
                    Sign UP
                  </Link>
                  <Link className="btn btn-outline-dark" to="/signIn">
                    Login
                  </Link>
                </div>
              )) || (
                <button
                  className="btn btn-outline-dark"
                  onClick={() => signOutUser()}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default withRouter(NavBar);
