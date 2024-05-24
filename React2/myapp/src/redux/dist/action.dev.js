"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REMOVE = exports.DLT = exports.ADD = void 0;

var ADD = function ADD(item) {
  return {
    type: "ADD_CART",
    payload: item
  };
}; // remove iteams


exports.ADD = ADD;

var DLT = function DLT(id) {
  return {
    type: "RMV_CART",
    payload: id
  };
}; // remove individual iteam


exports.DLT = DLT;

var REMOVE = function REMOVE(item) {
  return {
    type: "RMV_ONE",
    payload: item
  };
};

exports.REMOVE = REMOVE;
//# sourceMappingURL=action.dev.js.map
