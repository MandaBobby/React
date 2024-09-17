import React from "react";

function Home(props){
    return(
        <>
        <h1>{props.personName}</h1>
        <h1>{props.personAge}</h1>
        </>
    )
}

export default Home;