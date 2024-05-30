#!/usr/bin/env node
import { render } from 'ink';
import React from 'react';
// import meow from 'meow';
import App from './app.js';
import Context from './context.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ backup-sync

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ backup-sync --name=Jane
// 	  Hello, Jane
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

render(<Context><App /></Context>);
