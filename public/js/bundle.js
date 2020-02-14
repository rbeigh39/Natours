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
/******/ 	return __webpack_require__(__webpack_require__.s = "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/@babel/polyfill/lib/index.js":
/*!**************************************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/@babel/polyfill/lib/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\Rayan\\\\Desktop\\\\Learn\\\\00. Node.Js\\\\10. Advanced Features, Payments, Emails, File uploads\\\\AdvancedFeaturesPaymentsEmailsFileuploads_V3.0\\\\node_modules\\\\@babel\\\\polyfill\\\\lib\\\\index.js'\");\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/@babel/polyfill/lib/index.js?");

/***/ }),

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/axios/index.js":
/*!************************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/axios/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\Users\\\\Rayan\\\\Desktop\\\\Learn\\\\00. Node.Js\\\\10. Advanced Features, Payments, Emails, File uploads\\\\AdvancedFeaturesPaymentsEmailsFileuploads_V3.0\\\\node_modules\\\\axios\\\\index.js'\");\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/axios/index.js?");

/***/ }),

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/alerts.js":
/*!****************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/alerts.js ***!
  \****************************************************************************/
/*! exports provided: showAlert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showAlert\", function() { return showAlert; });\n/* eslint-disable*/\r\n\r\n// type is either 'success' or 'error'\r\nconst hideAlert = () => {\r\n   const el = document.querySelector('.alert');\r\n   if (el) el.parentNode.removeChild(el);\r\n};\r\n\r\nconst showAlert = (type, message) => {\r\n   hideAlert();\r\n   const markup = `<div class=\"alert alert--${type}\">${message}</div>`;\r\n   document.querySelector('body').insertAdjacentHTML('afterbegin', markup);\r\n\r\n   window.setTimeout(hideAlert, 5000);\r\n};\r\n\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/alerts.js?");

/***/ }),

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/index.js":
/*!***************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/index.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/@babel/polyfill/lib/index.js\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/login.js\");\n/* harmony import */ var _updateSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateSettings */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/updateSettings.js\");\n/* harmony import */ var _stripe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stripe */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/stripe.js\");\n/* eslint-disable */\r\n\r\n\r\n\r\n\r\n\r\n// DOM elements\r\nconst loginForm = document.querySelector('.form--login');\r\nconst logoutBtn = document.querySelector('.nav__el--logout');\r\nconst formUserData = document.querySelector('.form-user-data');\r\nconst changePasswordForm = document.querySelector('.form-user-password');\r\nconst bookBtn = document.getElementById('book-tour');\r\n\r\n// Deligation\r\nif (loginForm) {\r\n   loginForm.addEventListener('submit', event => {\r\n      event.preventDefault();\r\n\r\n      const email = document.getElementById('email').value;\r\n      const password = document.getElementById('password').value;\r\n      Object(_login__WEBPACK_IMPORTED_MODULE_1__[\"login\"])(email, password);\r\n   });\r\n}\r\n\r\nif (logoutBtn) {\r\n   logoutBtn.addEventListener('click', _login__WEBPACK_IMPORTED_MODULE_1__[\"logout\"]);\r\n}\r\n\r\nif (formUserData) {\r\n   formUserData.addEventListener('submit', event => {\r\n      event.preventDefault();\r\n\r\n      form.append('name', document.getElementById('name').value);\r\n      form.append('email', document.getElementById('email').value);\r\n      form.append('photo', document.getElementById('photo').files[0]);\r\n      console.log(form);\r\n\r\n      Object(_updateSettings__WEBPACK_IMPORTED_MODULE_2__[\"updateSettings\"])(form, 'data');\r\n   });\r\n}\r\n\r\nif (changePasswordForm) {\r\n   changePasswordForm.addEventListener('submit', async event => {\r\n      event.preventDefault();\r\n\r\n      document.querySelector('.btn--save-password').textContent = 'Updating...';\r\n\r\n      const currentPassword = document.getElementById('password-current').value;\r\n      const password = document.getElementById('password').value;\r\n      const passwordConfirm = document.getElementById('password-confirm').value;\r\n\r\n      await Object(_updateSettings__WEBPACK_IMPORTED_MODULE_2__[\"updateSettings\"])(\r\n         {\r\n            password,\r\n            currentPassword,\r\n            passwordConfirm\r\n         },\r\n         'password'\r\n      );\r\n\r\n      document.getElementById('password-current').value = '';\r\n      document.getElementById('password').value = '';\r\n      document.getElementById('password-confirm').value = '';\r\n\r\n      document.querySelector('.btn--save-password').textContent =\r\n         'Save Password';\r\n   });\r\n}\r\n\r\nif (bookBtn)\r\n   bookBtn.addEventListener('click', e => {\r\n      e.target.textContent = 'Processing...';\r\n\r\n      // const tourId = e.target.dataset.tourId\r\n      const { tourId } = e.target.dataset;\r\n      Object(_stripe__WEBPACK_IMPORTED_MODULE_3__[\"bookTour\"])(tourId);\r\n   });\r\n\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/index.js?");

/***/ }),

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/login.js":
/*!***************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/login.js ***!
  \***************************************************************************/
/*! exports provided: login, logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logout\", function() { return logout; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alerts */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/alerts.js\");\n/* eslint-disable */\r\n\r\n\r\n\r\n\r\nconst login = async (email, password) => {\r\n   try {\r\n      const res = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\r\n         method: 'POST',\r\n         url: `http://127.0.0.1:3000/api/v1/users/login`,\r\n         // url: `http://192.168.43.53:3000/api/v1/users/login`,\r\n         data: {\r\n            email,\r\n            password\r\n         }\r\n      });\r\n\r\n      if (res.data.status === 'success') {\r\n         Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('success', 'Logged in successfully!');\r\n         window.setTimeout(() => {\r\n            location.assign('/');\r\n         }, 1500);\r\n      }\r\n   } catch (err) {\r\n      Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('error', err.response.data.message);\r\n   }\r\n};\r\n\r\nconst logout = async () => {\r\n   try {\r\n      const res = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\r\n         method: 'GET',\r\n         url: `http://127.0.0.1:3000/api/v1/users/logout`\r\n         // url: `http://192.168.43.53:3000/api/v1/users/logout`\r\n      });\r\n\r\n      if ((res.data.status = 'success')) {\r\n         Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('success', 'Logged out successfully');\r\n         // location.reload(true);\r\n         window.setTimeout(() => {\r\n            location.assign('/');\r\n         }, 500);\r\n      }\r\n   } catch (err) {\r\n      Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('error', 'Error logging out! Try again.');\r\n   }\r\n};\r\n\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/login.js?");

/***/ }),

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/stripe.js":
/*!****************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/stripe.js ***!
  \****************************************************************************/
/*! exports provided: bookTour */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bookTour\", function() { return bookTour; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alerts */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/alerts.js\");\n/* eslint-disable */\r\n\r\n\r\nconst stripe = Stripe('pk_test_qdlGX84TXdIVbW5EctqPryQq0098WnNVJK');\r\n\r\nconst bookTour = async tourId => {\r\n   try {\r\n      // 1) Get the checkout session from API\r\n      const session = await axios__WEBPACK_IMPORTED_MODULE_0___default()(\r\n         `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`\r\n      );\r\n      console.log(session);\r\n\r\n      // 2) Create checkout form + charge credit card\r\n      await stripe.redirectToCheckout({\r\n         sessionId: session.data.session.id\r\n      });\r\n   } catch (err) {\r\n      console.log(err);\r\n      Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('error', err);\r\n   }\r\n};\r\n\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/stripe.js?");

/***/ }),

/***/ "./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/updateSettings.js":
/*!************************************************************************************!*\
  !*** ./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/updateSettings.js ***!
  \************************************************************************************/
/*! exports provided: updateSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateSettings\", function() { return updateSettings; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _alerts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alerts */ \"./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/alerts.js\");\n/* eslint-disable */\r\n/*\r\nCreate updateData function. call that function from index.js\r\n*/\r\n\r\n\r\n\r\n\r\n// type is either 'password' or 'data'\r\nconst updateSettings = async (data, type) => {\r\n   const url =\r\n      type === 'password'\r\n         ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'\r\n         : 'http://127.0.0.1:3000/api/v1/users/updateMe';\r\n\r\n   try {\r\n      const res = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\r\n         method: 'PATCH',\r\n         url,\r\n         data\r\n      });\r\n\r\n      if (res.data.status === 'success')\r\n         Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('success', `${type.toUpperCase()} updated successfully!`);\r\n   } catch (err) {\r\n      Object(_alerts__WEBPACK_IMPORTED_MODULE_1__[\"showAlert\"])('error', err.response.data.message);\r\n   }\r\n};\r\n\r\n// export const updateNameEmail = async data => {\r\n//    try {\r\n//       const res = await axios({\r\n//          method: 'PATCH',\r\n//          url: 'http://127.0.0.1:3000/api/v1/users/updateMe',\r\n//          data\r\n//       });\r\n\r\n//       if (res.data.status === 'success')\r\n//          showAlert('success', 'Data updated successfully!');\r\n//    } catch (err) {\r\n//       showAlert('error', err.response.data.message);\r\n//    }\r\n// };\r\n\n\n//# sourceURL=webpack:///./AdvancedFeaturesPaymentsEmailsFileuploads_V3.0/public/js/updateSettings.js?");

/***/ })

/******/ });