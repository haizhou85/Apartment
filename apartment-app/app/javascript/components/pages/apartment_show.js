import React from "react"

class ApartmentShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apartment:[],
      user:[]
    }
    this.getApartment()
  }

  componentDidMount(){
    this.getApartment()
  }

  getApartment = () => {
    const { id } = this.props.match.params
    fetch(`http://localhost:3000/apartments/${id}`)
    .then((response)=>{
     if(response.status === 200){
       return(response.json())
     }
   })
   .then((apartmentInfo)=>{
     this.setState({
       apartment: apartmentInfo.apartment,
       user: apartmentInfo.user
     })
   })
 }
  render () {
    const { apartment, user } = this.state
    return (
      <React.Fragment>
        <h2>{ apartment.street }</h2>
        <p>{ apartment.city }, { apartment.state }, { apartment.zipcode }, { apartment.country }</p>
        <h3> { user.name }</h3>
        <p>Phone number: { user.phonenumber }</p>
        <p>Hours to contact: { user.hours }</p>

      </React.Fragment>
    );
  }
}

export default ApartmentShow
