import React from 'react';
import Radium from 'radium';
import toolbox from './toolbox';

export const h1 = Radium(({ children }) => (
  <div style={h1.style.container}>
    <h1 style={h1.style.header}>{ children }</h1>
  </div>
));

h1.style = {
  container: {
    marginBottom: toolbox.spacing,
  },
  header: {
    fontSize: "2.5em",
    fontFamily: toolbox.fonts.secondary,
    lineHeight: "1em",
    color: toolbox.colors.primary,
    textShadow: "#111 0px 0px 1px",
  },
};
