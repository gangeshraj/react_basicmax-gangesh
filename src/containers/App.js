import React, { PureComponent } from "react";

import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../hoc/Auxiliary";
import withClass from "../hoc/WithClass";

//exporting to use this context API
export const AuthContext = React.createContext(false);//false is default value


class App extends PureComponent {//pure component having own shouldComponentUpdate lifecyclehook


  constructor(props) {
    super(props);
    console.log("[App.js] Inside Constructor", props);
    this.state = {
      persons: [
        { id: "asfa1", name: "Max", age: 28 },
        { id: "vasdf1", name: "Manu", age: 29 },
        { id: "asdf11", name: "Stephanie", age: 26 }
      ],
      otherState: "some other value",
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  componentWillMount() {
    console.log("[App.js] Inside componentWillMount()");
  }

  componentDidMount() {
    console.log("[App.js] Inside componentDidMount()");
  }

  // shouldComponentUpdate ( nextProps, nextState ) {
  //   console.log( '[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState );
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE App.js] Inside componentWillUpdate",
      nextProps,
      nextState
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {//it is added in react 16.3 to use it and
    //componentWillMount componentWillUpdate componetWIllReceiveProps are discouraged
    console.log(
      "[UPDATE App.js] Inside getDerivedStateFromProps",
      nextProps,
      prevState
    );

    return prevState;
  }

  getSnapshotBeforeUpdate() {//executes before componnent updates(componentDidUpdate)
    console.log(
      "[UPDATE App.js] Inside getSnapshotBeforeUpdate"
    );
  }

  componentDidUpdate() {
    console.log("[UPDATE App.js] Inside componentDidUpdate");
  }

  // state = {
  //   persons: [
  //     { id: 'asfa1', name: 'Max', age: 28 },
  //     { id: 'vasdf1', name: 'Manu', age: 29 },
  //     { id: 'asdf11', name: 'Stephanie', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });


    const person = {
      ...this.state.persons[personIndex]
    };


    // creating a new copy alternate syntax of above code
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      };
    });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("[App.js] Inside render()");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showPersons: true });
          }}
        >
          Show Persons
        </button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler}
        />
        {/* it is uing the context api where child elements make use of global context  
        and below is the provider of the value of app.js*/}
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}


//high order component where any props in any way is passes for more information refer withClass
export default withClass(App, classes.App);
