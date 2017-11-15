import React, { Component } from 'react';

import pick from './pick';
import mapValueToProps from './mapValueToProps';


const initialStateFromProps = (props) => {
  const defaultFieldState = '';
  return props.reduce((i, n) => ({...i, [n]: defaultFieldState}), {});
}

export default (ComposedComponent, {
  initialState = {},
  propsToState = [],
  changeEvent = false,
  singleValue = false,
  changeCallback = 'onChange'}) => {
  class StateManagedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ...initialStateFromProps(propsToState),
        ...initialState
      };
    }

    handleChange = (change) => {
      this.setState(this.getNewState(change));
    }

    getNewState(change) {
      if (changeEvent) {
        return (mapValueToProps(propsToState, change.target.value));
      } else if (singleValue) {
        return (mapValueToProps(propsToState, change));
      } else {
        return (pick(change, propsToState));
      }
    }

    render() {
      const callbacks = {
        [changeCallback]: this.handleChange
      }

      return (<ComposedComponent {...this.props} {...this.state} {...callbacks} />);
    }
  }
  return StateManagedComponent;
};
