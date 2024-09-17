import React, { Component } from "react";
import Service from "./Service";

class Support extends Component{
    constructor(){
        super();
        this.company={
            name:"krify",
            year:1990,
        };
    }
    render(){
        return(
            <>
            <h1> this is support component</h1>
            <Service sujan={this.company.year}/>
            </>
        );
    }
}
export default Support;