"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _main = _interopRequireDefault(require("./redux/main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _redux.createStore)(_main["default"]);
var _default = store;
exports["default"] = _default;
//# sourceMappingURL=store.dev.js.map
