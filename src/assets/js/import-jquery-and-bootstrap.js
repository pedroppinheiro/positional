if (typeof module === 'object') {
  window.module = module; module = undefined;
}

const $ = require('jquery');
require('popper.js');
require('bootstrap');

if (window.module) {
  module = window.module;
} 



// window.$ = window.jQuery = require('jquery')
// window.Tether = require('tether')
// window.Bootstrap = require('bootstrap')