import React, {Component} from "react";

class Counter_c extends Component {
  //  creanting state with key age and value 17
  state = {
    age: 17,
  };

//creating Increment function
  Increment= () => {
    this.setState({
      age: this.state.age + 1 
    });
  }

 // creating Decrement  function
  Decrement=()=>{
    this.setState({
     age:this.state.age-1
    })
  }

  render() {
    return (
      <>
        <p>You are {this.state.age}.</p>
        <button onClick={this.Increment}>Increment age</button>  {/* button for Increment */}
        <button onClick={this.Decrement}>Decrement age</button>  {/* button for Decrement */}
      </>
    );
  }
}

export default Counter_c;