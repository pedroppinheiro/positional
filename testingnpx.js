#!/usr/bin/env node

import {series} from 'async';
const {exec} = require('child_process');

series([
 exec('npm start')
]); 