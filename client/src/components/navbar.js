import { useNavigate } from "react-router-dom";

const NavBar = ({ status }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    alert(`Logout Successful!`);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid">
          <a className="navbar-brand app-brand mx-2" href="#/">
            iBank
          </a>
          <button
            className="navbar-toggler navbar-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            {status ? (
              <ul className="navbar-nav navbar-light flex-column flex-md-row ms-auto">
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages active" href="#/">
                    Home
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages" href="#/deposit/">
                    Deposit
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages" href="#/withdraw/">
                    Withdraw
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages" href="#/alldata/">
                    Balance
                  </a>
                </li>
                <li className="nav-item px-1">
                  <button
                    className="nav-link nav-pages logout"
                    href="#/logout/"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav navbar-light flex-column flex-md-row ms-auto">
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages active" href="#/">
                    Home
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages" href="#/login/">
                    Login
                  </a>
                </li>
                <li className="nav-item px-1">
                  <a className="nav-link nav-pages" href="#/createaccount/">
                    Create Account
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
