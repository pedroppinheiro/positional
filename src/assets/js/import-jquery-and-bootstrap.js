if (typeof module === 'object') {
  window.module = module; module = undefined;
}

const $ = require('jquery');
require('popper.js');
require('bootstrap');

if (window.module) {
  module = window.module;
}
