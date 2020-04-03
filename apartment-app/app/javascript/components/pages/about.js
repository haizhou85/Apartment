import React from "react"
import headshot from "./headshot.JPG"

class About extends React.Component {
  render () {

    return (
      <React.Fragment>
        <div class="card bg-light mb-3" style={{maxWidth: "20rem", margin:"1em 2em"}}>
          <div class="card-header">Develop and Design</div>
          <div class="card-body">
          <img alt="Haizhou Guo" src={headshot} style={{borderRadius:'100px', width:"70%", margin:"5% 15%"}}/>
          <h4 class="card-title" style={{textAlign: "center"}}>Haizhou Guo</h4>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About
