import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Person.css";
import withClass from "../../../hoc/WithClass";
import Aux from "../../../hoc/Auxiliary";
import { AuthContext } from "../../../containers/App";

class Person extends Component {
  constructor(props) {
    super(props);
    console.log("[Person.js] Inside Constructor", props);
    this.inputElement = React.createRef();
  }

  componentWillMount() {
    console.log("[Person.js] Inside componentWillMount()");
  }

  componentDidMount() {
    console.log("[Person.js] Inside componentDidMount()");
    if (this.props.position === 0) {
      this.inputElement.current.focus();
    }
  }

  focus() {//reeact new way  for ref in react 16.3
    //the refElement.current.property or whatever applied
    this.inputElement.current.focus();
  }

  render() {
    console.log("[Person.js] Inside render()");
    return (
      <Aux>
        <AuthContext.Consumer>{/*here the global context passed directly passed from parent without any props
        here it is consumer unlike the parent which is provider*/}
          {auth => auth ? <p>I'm authenticated!</p> : null}
        </AuthContext.Consumer>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          ref={this.inputElement //this is the refrence which is passed to high order function using 
          //react.forwardRef in withClass a new addition of 16.3
          }
        
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
    // return [
    //     <p key="1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
    //     <p key="2">{this.props.children}</p>,
    //     <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />
    // ]
  }
}

//props types is checked to be of the type we are providing in PropTypes
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};


//passing high order function a way so we can pass the props dynamically 
//for different components to same high order component
export default withClass(Person, classes.Person);
