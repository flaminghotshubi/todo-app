import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href=".">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"></img>
            &nbsp; To-do List
          </a>
        </div>
      </nav>
    )
  }
}
