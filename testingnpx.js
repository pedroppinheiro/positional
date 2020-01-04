#!/usr/bin/env node

const { exec } = require('child_process');

exec('npm install && npm start', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});