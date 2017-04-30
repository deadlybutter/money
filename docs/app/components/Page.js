import React from 'react';
import Radium from 'radium';
import toolbox from './toolbox';

const Page = ({ children }) => (
  <div style={Page.style.outer}>
    <span style={Page.style.highlight} />
    <div style={Page.style.container}>
      <div ref="width" style={Page.style.inner}>
        { children }
      </div>
    </div>
  </div>
);

Page.style = {
  outer: {
    width: "100%",
  },
  container: {
    maxWidth: "600px",
    fontSize: toolbox.fonts.base,
    margin: "auto",
  },
  inner: {
    padding: toolbox.spacing,
  },
  highlight: {
    posisition: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "2px",
    background: toolbox.colors.primary,
    display: "block",
    content: "",
  }
};

export default Radium(Page);
