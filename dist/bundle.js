/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n// eslint-disable-next-line import/no-extraneous-dependencies\n__webpack_require__(1);\n\n// normalize.css must be loaded first before app css, so disable eslint check\n/* eslint-disable import/first */\n\n/* eslint-enable import/first */\n\nconst phototagAPIUtils = __webpack_require__(3);\n\nfunction handleResp(param) {console.log(\"handling response like a boss\");}\nfunction handleErr(param) {console.log(param);}\n\nphototagAPIUtils.makeAPIGetRequest(phototagAPIUtils.apiPaths.photoPath, {} , handleResp, handleErr);\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./node_modules/normalize.css/normalize.css?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/css/style.scss?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

eval("\nconst phototagAPIUtils = {\n  apiPaths: {\n    photoPath: \"/api/v1/photos\"\n  },\n\n  buildAPIGetRequest(path, paramHash) {\n    let uri = `http://localhost:3000${path}?APITOKEN=9931c7c14267f95303df6518c28d8fd6`;\n\n    for (let key in paramHash) {\n      uri += `&${key}=${paramHash[key]}`;\n    }\n\n    return uri;\n  },\n\n  async doAPIGet(path, paramHash) {\n    let response;\n\n    try {\n      response = await fetch(phototagAPIUtils.buildAPIGetRequest(path, paramHash));\n    } catch(err) {\n      return Promise.reject(err);\n    }\n\n    if (response.ok) {\n      return Promise.resolve(response.json());\n    } else {\n      return Promise.reject(response);\n    }\n  },\n\n  makeAPIGetRequest(path, paramsHash, handleResp, handleErr) {\n    const timeoutPromise = new Promise((resolve, reject) => {\n      const id = setTimeout(() => {\n        clearTimeout(id);\n        reject('Photo server took too long to respond.');\n      }, 20000);\n    });\n\n    const apiRequest = Promise.race([phototagAPIUtils.doAPIGet(path, paramsHash), timeoutPromise]);\n\n    apiRequest.then(\n      response => {\n        handleResp(response);\n      },\n      error => {\n        handleErr(error);\n      }\n    );\n  },\n};\n\nmodule.exports = phototagAPIUtils;\n\n\n//# sourceURL=webpack:///./src/phototagAPIUtils.js?");

/***/ })
/******/ ]);