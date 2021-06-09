import React from 'react'
import { Jumbotron } from 'react-bootstrap';
import { useHistory } from "react-router"

const PageNotFound = () => {
    const history = useHistory();
    return (
        <Jumbotron>
            <h1>NOT FOUND!!</h1>
            <h3>you can go back to safety by click <span className={"navigation-link"} onClick={() => history.push("/")}>here</span></h3>
        </Jumbotron>
    )
}

export default PageNotFound;

