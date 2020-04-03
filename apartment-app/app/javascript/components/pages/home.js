import React from "react"
import background from "./background.jpeg"

class Home extends React.Component {
  render () {

    return (
      <>
        <img src={background} style={{width:"100vw"}}/>
      </>
    );
  }
}

export default Home
