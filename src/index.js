import React, { Component } from 'react';

import pick from './pick';
import mapValueToProps from './mapValueToProps';

export default (ComposedComponent, {
  initialState = {},
  propsToState = [],
  changeEvent = false,
  singleValue = false,
  changeCallback = 'onChange'} = {}) => {
  class StateManagedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    handleChange = (change) => {
      if (changeEvent) {
        this.setState(mapValueToProps(propsToState, change.target.value));
      } else if (singleValue) {
        this.setState(mapValueToProps(propsToState, change));
      } else {
        this.setState(() => pick(change, propsToState));
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
