import React, { useState } from "react";
import Home from "./Home";

function  About(){
const obj={
    name:"react",
    age:17
};

return(
    <>
    <h1>this is about</h1>
    <Home personName={obj.name}  personAge={obj.age}/>
    </>
)
}
export default About;