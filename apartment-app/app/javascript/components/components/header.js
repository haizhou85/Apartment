import React from "react"


class Header extends React.Component {

  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      edit_user_route
    } = this.props

    return (
      <React.Fragment>
        <div class="jumbotron">
          <h1 class="display-3">Apartment Management App</h1>
          <p class="lead">This is an app you can browse and manage apartment listings</p>
        </div>

        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/apartmentindex">Apartments</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
              </li>
              {logged_in &&
                <li>
                  <a class="nav-link" href={sign_out_route}>Sign Out</a>
                </li>}

              {!logged_in &&
                <li>
                  <a class="nav-link" href={sign_in_route}>Sign In</a>
                </li>}

              {logged_in &&
                <li>
                  <a class="nav-link" href={edit_user_route}>Edit you contact</a>
                </li>
                }
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header
