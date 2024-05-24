"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartreducer = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT_STATE = {
  carts: []
};

var cartreducer = function cartreducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "ADD_CART":
      var IteamIndex = state.carts.findIndex(function (iteam) {
        return iteam.id === action.payload.id;
      });

      if (IteamIndex >= 0) {
        state.carts[IteamIndex].qnty += 1;
        return _objectSpread({}, state, {
          carts: _toConsumableArray(state.carts)
        });
      } else {
        var temp = _objectSpread({}, action.payload, {
          qnty: 1
        });

        return _objectSpread({}, state, {
          carts: [].concat(_toConsumableArray(state.carts), [temp])
        });
      }

    case "RMV_CART":
      var data = state.carts.filter(function (el) {
        return el.id !== action.payload;
      }); // console.log(data);

      return _objectSpread({}, state, {
        carts: data
      });

    case "RMV_ONE":
      var IteamIndex_dec = state.carts.findIndex(function (iteam) {
        return iteam.id === action.payload.id;
      });

      if (state.carts[IteamIndex_dec].qnty >= 1) {
        var dltiteams = state.carts[IteamIndex_dec].qnty -= 1;
        console.log([].concat(_toConsumableArray(state.carts), [dltiteams]));
        return _objectSpread({}, state, {
          carts: _toConsumableArray(state.carts)
        });
      } else if (state.carts[IteamIndex_dec].qnty === 1) {
        var _data = state.carts.filter(function (el) {
          return el.id !== action.payload;
        });

        return _objectSpread({}, state, {
          carts: _data
        });
      }

      break;

    default:
      return state;
  }
};

exports.cartreducer = cartreducer;
//# sourceMappingURL=reducer.dev.js.map
