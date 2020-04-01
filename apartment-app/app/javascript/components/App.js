import React from "react"
import PropTypes from "prop-types"
import Header from "./components/header"
import 'bootswatch/dist/litera/bootstrap.min.css';
import Home from "./pages/home"
import About from "./pages/about"
import ApartmentIndex from "./pages/apartment_index"
import ApartmentShow from "./pages/apartment_show"
import NotFound from "./pages/notfound"
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'



class App extends React.Component {
  constructor(){
    super()
    this.state = {
      apartments: [],
        }
    this.getApartments()
      }

    componentDidMount(){
      this.getApartments()
    }

    getApartments = () => {
     fetch("http://localhost:3000/apartments")
     .then((response)=>{
       if(response.status === 200){
         return(response.json())
       }
     })
     .then((apartmentsArray)=>{
       this.setState({ apartments: apartmentsArray })
     })
   }

  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      edit_user_route
    } = this.props

    return (
      <React.Fragment>
      <Header
      logged_in = { logged_in }
      sign_in_route = { sign_in_route }
      sign_out_route = { sign_out_route }
      edit_user_route = { edit_user_route }
      />
      <Router>

        <Switch>
          <Route path="/about/" component={ About } />
          <Route path="/apartmentindex/:id"
          render={ (props) => <ApartmentShow {...props} /> } />
          <Route path="/apartmentindex/"
          render={ (props) => <ApartmentIndex apartments={ this.state.apartments } /> } />
          <Route path="/" exact component={ Home } />
          <Route component={ NotFound } />
        </Switch>
      </Router>
      </React.Fragment>
    );
  }
}

export default App
