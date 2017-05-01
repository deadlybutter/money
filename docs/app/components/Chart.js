import React from 'react';
import Radium, { Style } from 'radium';
import toolbox from './toolbox';

const Chart = ({ children, height }) => (
  <div style={Chart.style}>
    <Style rules={Chart.hoverRules} />
    <Style rules={Chart.textRules} />
    <svg width="100%" height={height}>
      { children }
    </svg>
  </div>
);

Chart.defaultProps = {
  height: "150px",
};

Chart.style = {
  margin: `${toolbox.spacing} 0`,
};

Chart.textRules = {
  'svg text': {
    fontFamily: toolbox.fonts.primary,
    fontSize: ".5em",
  },
};

Chart.hoverRules = {
  'svg g.hover-control text': {
    display: 'none',
  },
  'svg g.hover-control:hover text': {
    display: 'block',
  },
};

export default Radium(Chart);
