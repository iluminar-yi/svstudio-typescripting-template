// These need testing to show they work in the JavaScript Runtime

import 'core-js/features/array';
// import 'core-js/features/array-buffer';
// import 'core-js/features/async-iterator';
// import 'core-js/features/data-view';
import 'core-js/features/date';
// import 'core-js/features/dom-collections'; // There is no DOM
import 'core-js/features/function';
// import 'core-js/features/instance'; // No index.js to import
import 'core-js/features/iterator';
import 'core-js/features/json';
import 'core-js/features/map';
import 'core-js/features/math';
import 'core-js/features/number';
import 'core-js/features/object';
import 'core-js/features/observable';
// import 'core-js/features/promise'; // Using core-js-pure instead
import 'core-js/features/reflect';
import 'core-js/features/regexp';
import 'core-js/features/set';
import 'core-js/features/string';
import 'core-js/features/symbol';
import 'core-js/features/typed-array';
// import 'core-js/features/url';
// import 'core-js/features/url-search-params';
import 'core-js/features/weak-map';
import 'core-js/features/weak-set';

import { _global } from '../_global';
// @ts-ignore
_global.crypto = { getRandomValues: require('polyfill-crypto.getrandomvalues') };
