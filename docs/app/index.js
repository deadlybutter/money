import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

import Page from './components/Page';
import Markdown from './components/Markdown';

import data from './data';
window.data = data;

const resizeListeners = [];

window.addResizeListener = (listener) => {
  resizeListeners.push(listener);
}

window.onresize = () => {
  for (const listener of resizeListeners) listener();
}

fetch('./content/markup.md')
  .then((res) => res.text())
  .then((text) => {
    render((
      <Page>
        <Markdown text={text} />
      </Page>
    ), document.getElementById('jsx-root'));
  });
