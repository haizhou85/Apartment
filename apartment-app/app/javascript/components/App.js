import React from "react"
import PropTypes from "prop-types"
import Header from "./components/header"
import 'bootswatch/dist/litera/bootstrap.min.css';
import Home from "./pages/home"
import About from "./pages/about"
import MyListings from "./pages/my_listings"
import ApartmentIndex from "./pages/apartment_index"
import ApartmentShow from "./pages/apartment_show"
import NewApartment from "./pages/new_apartment"
import NotFound from "./pages/notfound"
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'



class App extends React.Component {
  constructor(){
    super()
    this.state = {
      apartments: [],
      myApartments:[]
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
       this.setState({
         apartments: apartmentsArray.apartments,
         myApartments: apartmentsArray.myApartments
        })
     })
   }

   createApartment = (newApartment) => {
    return fetch("http://localhost:3000/apartments", {
    	body: JSON.stringify(newApartment),
    	headers: {
    		"Content-Type": "application/json"
    	},
    	method: "POST"
    })
    .then((response) => {
      if(response.ok){
        return this.getApartments()
      }
    })
  }

  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      edit_user_route,
      current_user
    } = this.props

    return (
      <React.Fragment>
      <Header
      logged_in = { logged_in }
      sign_in_route = { sign_in_route }
      sign_out_route = { sign_out_route }
      edit_user_route = { edit_user_route }
      current_user = { current_user }
      myListings = { this.state.myApartments }
      />
      <Router>
        <Switch>
          <Route
          exact path="/about/" component={ About } />
          <Route
          exact path="/newform"
            render={ (props) => <NewApartment
              handleSubmit={ this.createApartment } /> }/>
          <Route
          exact path="/apartmentindex/:id"
          render={ (props) => <ApartmentShow {...props} /> } />
          <Route
          exact path="/apartmentindex/"
          render={ (props) => <ApartmentIndex apartments={ this.state.apartments } /> } />
          <Route
          exact path="/mylistings/"
          render={ (props) => <MyListings apartments={ this.state.myApartments } /> } />
          <Route
          exact path="/" exact component={ Home } />
          <Route
          component={ NotFound } />
        </Switch>
      </Router>
      </React.Fragment>
    );
  }
}

export default App
