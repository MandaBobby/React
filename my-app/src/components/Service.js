import React,{Component} from "react";
class Service extends Component{

     render(){
      return(
        <>
        <p>this is service component</p>
        <h1>this is {this.props.sujan}</h1>
        </>
      )
     }
}
export default Service;