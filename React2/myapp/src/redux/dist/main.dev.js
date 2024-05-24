"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reducer = require("./reducer");

var rootred = (0, _redux.combineReducers)({
  cartreducer: _reducer.cartreducer
});
var _default = rootred;
exports["default"] = _default;
//# sourceMappingURL=main.dev.js.map
