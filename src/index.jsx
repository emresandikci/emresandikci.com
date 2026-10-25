import React from 'react';
import { render } from 'react-dom';
import { App } from 'pages';
import { version } from '../package.json';

console.log(`emresandikci.com v${version}`);

render(<App />, document.getElementById('root'));
