if (typeof module === 'object') {
  (window as any).module = module;
  module = undefined;
}

import * as $ from 'jquery';
(window as any).$ = $;
import 'popper.js';
import 'bootstrap';

if ((window as any).module) {
  module = (window as any).module;
}
