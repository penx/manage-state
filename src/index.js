import React, { Component } from 'react';

import pick from './pick';
import mapValueToProps from './mapValueToProps';

export default (ComposedComponent, { initialState = {}, propsToState = [], changeEvent = false }) => {
  class StateManagedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    handleChange = (change) => {
      if (changeEvent) {
        this.setState(mapValueToProps(propsToState, change.target.value));
      } else {
        this.setState(() => pick(change, propsToState));
      }
    }
    render() {
      return (<ComposedComponent {...this.props} {...this.state} onChange={this.handleChange} />);
    }
  }
  return StateManagedComponent;
};
