import React from 'react';

class Ruler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      id: `width-${Math.round(Date.now() * Math.random())}`,
    };

    this.measure = this.measure.bind(this);
  }

  measure() {
    const width = parseInt(getComputedStyle(document.getElementById(this.state.id)).width);
    this.setState({ width });
  }

  componentDidMount() {
    this.measure();
    window.onresize = this.measure;
  }

  render() {
    const { children } = this.props;
    const { width, id } = this.state;

    const childProps = {
      rulerWidth: width,
    };

    return (
      <div id={`${id}`}>
        { React.Children.map(children, child => React.cloneElement(child, childProps))}
      </div>
    );
  }
}

export default Ruler;
