import React from 'react';
import marksy from 'marksy';
import Radium from 'radium';
import toolbox from './toolbox';
import { h1 } from './Headers';
import Ruler from './Ruler';
import TransactionsChart from './TransactionsChart';
import BarChart from './BarChart';
import ScatterChart from './ScatterChart';

const Markdown = ({ text }) => {
  const compile = marksy({
    components: {
      TransactionsChart (props) {
        return (
          <Ruler>
            <TransactionsChart {...props} />
          </Ruler>
        );
      },
      BarChart (props) {
        return (
          <Ruler>
            <BarChart {...props} />
          </Ruler>
        );
      },
      ScatterChart (props) {
        return (
          <Ruler>
            <ScatterChart {...props} />
          </Ruler>
        );
      },
    },
    h1,
  });

  return (
    <div style={Markdown.style}>
      { compile(text).tree }
    </div>
  );
};

Markdown.style = {
  fontFamily: toolbox.fonts.primary,
};

export default Radium(Markdown);
