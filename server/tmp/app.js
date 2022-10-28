/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/auths/index.ts":
/*!****************************!*\
  !*** ./src/auths/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-local */ "passport-local");
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-jwt */ "passport-jwt");
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _configs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/configs */ "./src/configs/index.ts");
/* harmony import */ var _providers_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/providers/user */ "./src/providers/user.ts");






passport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_local__WEBPACK_IMPORTED_MODULE_1__.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}, async (username, password, done) => {
    const { findOneByLoginId } = (0,_providers_user__WEBPACK_IMPORTED_MODULE_5__["default"])();
    const user = await findOneByLoginId(username);
    if (!user || !bcrypt__WEBPACK_IMPORTED_MODULE_3___default().compareSync(password, user.login_password)) {
        return done(null, false);
    }
    else {
        return done(null, {
            id: user.id,
            name: user.name,
            username: user.login_id,
        });
    }
}));
const opts = {
    jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_2__.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: _configs__WEBPACK_IMPORTED_MODULE_4__["default"].jwt_secret_key,
};
passport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_jwt__WEBPACK_IMPORTED_MODULE_2__.Strategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload);
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((passport__WEBPACK_IMPORTED_MODULE_0___default()));


/***/ }),

/***/ "./src/auths/jwt.ts":
/*!**************************!*\
  !*** ./src/auths/jwt.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sign": () => (/* binding */ sign)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs */ "./src/configs/index.ts");


const sign = (user) => {
    const payload = { user };
    const exp = Math.floor(Date.now() / 1000) + _configs__WEBPACK_IMPORTED_MODULE_1__["default"].jwt_max_age;
    return {
        token: jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({
            ...payload,
            exp,
        }, _configs__WEBPACK_IMPORTED_MODULE_1__["default"].jwt_secret_key),
        user,
        exp,
    };
};


/***/ }),

/***/ "./src/commons/logger.ts":
/*!*******************************!*\
  !*** ./src/commons/logger.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var log4js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! log4js */ "log4js");
/* harmony import */ var log4js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(log4js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configs_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/configs/index */ "./src/configs/index.ts");


log4js__WEBPACK_IMPORTED_MODULE_0___default().configure({
    appenders: {
        access: {
            type: 'dateFile',
            filename: `${_configs_index__WEBPACK_IMPORTED_MODULE_1__["default"].log_dir}/access.log`,
            pattern: '-yyyy-MM-dd',
            backups: 7,
        },
        system: {
            type: 'dateFile',
            filename: `${_configs_index__WEBPACK_IMPORTED_MODULE_1__["default"].log_dir}/system.log`,
            pattern: '-yyyy-MM-dd',
            backups: 7,
        },
        output: {
            type: 'console',
        },
    },
    categories: {
        default: { appenders: ['output'], level: 'info' },
        access: { appenders: ['access'], level: 'all' },
        system: { appenders: ['system', 'output'], level: 'all' },
    },
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    access: log4js__WEBPACK_IMPORTED_MODULE_0___default().getLogger('access'),
    system: log4js__WEBPACK_IMPORTED_MODULE_0___default().getLogger('system'),
    express: log4js__WEBPACK_IMPORTED_MODULE_0___default().connectLogger(log4js__WEBPACK_IMPORTED_MODULE_0___default().getLogger('access'), {
        level: 'info',
    }),
});


/***/ }),

/***/ "./src/configs/index.ts":
/*!******************************!*\
  !*** ./src/configs/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, 'app.config.json'), 'utf-8')));


/***/ }),

/***/ "./src/graphqls/context.ts":
/*!*********************************!*\
  !*** ./src/graphqls/context.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "context": () => (/* binding */ context),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dataloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataloader */ "./src/graphqls/dataloader.ts");

const context = () => {
    return {
        loader: _dataloader__WEBPACK_IMPORTED_MODULE_0__["default"],
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (context);


/***/ }),

/***/ "./src/graphqls/dataloader.ts":
/*!************************************!*\
  !*** ./src/graphqls/dataloader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});


/***/ }),

/***/ "./src/graphqls/index.ts":
/*!*******************************!*\
  !*** ./src/graphqls/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express-graphql */ "express-graphql");
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express_graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphqls_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/graphqls/schema */ "./src/graphqls/schema.ts");
/* harmony import */ var _graphqls_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/graphqls/context */ "./src/graphqls/context.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,express_graphql__WEBPACK_IMPORTED_MODULE_0__.graphqlHTTP)((req) => {
    return {
        schema: _graphqls_schema__WEBPACK_IMPORTED_MODULE_1__["default"],
        context: (0,_graphqls_context__WEBPACK_IMPORTED_MODULE_2__["default"])(),
        graphiql: true,
    };
}));


/***/ }),

/***/ "./src/graphqls/resolvers/index.ts":
/*!*****************************************!*\
  !*** ./src/graphqls/resolvers/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graphqls_resolvers_study_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/graphqls/resolvers/study/query */ "./src/graphqls/resolvers/study/query.ts");

const resolver = {
    Query: {
        studies: _graphqls_resolvers_study_query__WEBPACK_IMPORTED_MODULE_0__.studiesQueryResolver,
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolver);


/***/ }),

/***/ "./src/graphqls/resolvers/study/query.ts":
/*!***********************************************!*\
  !*** ./src/graphqls/resolvers/study/query.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "studiesQueryResolver": () => (/* binding */ studiesQueryResolver)
/* harmony export */ });
/* harmony import */ var _providers_study__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/providers/study */ "./src/providers/study.ts");

const studiesQueryResolver = async () => {
    const { findAll } = (0,_providers_study__WEBPACK_IMPORTED_MODULE_0__["default"])();
    return await findAll();
};


/***/ }),

/***/ "./src/graphqls/schema.ts":
/*!********************************!*\
  !*** ./src/graphqls/schema.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graphql-tools/schema */ "@graphql-tools/schema");
/* harmony import */ var _graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphqls_type_defs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/graphqls/type-defs */ "./src/graphqls/type-defs.ts");
/* harmony import */ var _graphqls_resolvers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/graphqls/resolvers/index */ "./src/graphqls/resolvers/index.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_graphql_tools_schema__WEBPACK_IMPORTED_MODULE_0__.makeExecutableSchema)({
    typeDefs: _graphqls_type_defs__WEBPACK_IMPORTED_MODULE_1__["default"],
    resolvers: _graphqls_resolvers_index__WEBPACK_IMPORTED_MODULE_2__["default"],
}));


/***/ }),

/***/ "./src/graphqls/type-defs.ts":
/*!***********************************!*\
  !*** ./src/graphqls/type-defs.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, 'schema.graphql'), 'utf-8').toString());


/***/ }),

/***/ "./src/middlewares/error-handler.ts":
/*!******************************************!*\
  !*** ./src/middlewares/error-handler.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/commons/logger */ "./src/commons/logger.ts");

const error = (err, req, res, next) => {
    _commons_logger__WEBPACK_IMPORTED_MODULE_0__["default"].system.error(err);
    res.status(err.status || 500);
    res.end();
};
const notfound = (req, res, next) => {
    next({ status: 404 });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    error: error,
    notfound: notfound,
});


/***/ }),

/***/ "./src/providers/client.ts":
/*!*********************************!*\
  !*** ./src/providers/client.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient());


/***/ }),

/***/ "./src/providers/study.ts":
/*!********************************!*\
  !*** ./src/providers/study.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _providers_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/providers/client */ "./src/providers/client.ts");

const studyProvider = () => {
    const findAll = async () => {
        return await _providers_client__WEBPACK_IMPORTED_MODULE_0__["default"].study.findMany();
    };
    return { findAll };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (studyProvider);


/***/ }),

/***/ "./src/providers/user.ts":
/*!*******************************!*\
  !*** ./src/providers/user.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _providers_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/providers/client */ "./src/providers/client.ts");

const userProvider = () => {
    const findOneByLoginId = async (loginId) => {
        return await _providers_client__WEBPACK_IMPORTED_MODULE_0__["default"].user.findUniqueOrThrow({
            where: {
                login_id: loginId,
            },
        });
    };
    return { findOneByLoginId };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userProvider);


/***/ }),

/***/ "./src/routes/auth.ts":
/*!****************************!*\
  !*** ./src/routes/auth.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auths_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/auths/index */ "./src/auths/index.ts");
/* harmony import */ var _auths_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/auths/jwt */ "./src/auths/jwt.ts");



const router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();
router.post('/login', _auths_index__WEBPACK_IMPORTED_MODULE_1__["default"].authenticate('local', {
    session: false,
}), (req, res, next) => {
    res.json({ ...(0,_auths_jwt__WEBPACK_IMPORTED_MODULE_2__.sign)(req.user) });
});
router.post('/auth', _auths_index__WEBPACK_IMPORTED_MODULE_1__["default"].authenticate('jwt', { session: false }), (req, res, next) => {
    const auth = req.user;
    res.json(auth);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/commons/logger */ "./src/commons/logger.ts");
/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/routes/auth */ "./src/routes/auth.ts");



const router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();
router.use((req, res, next) => {
    let log = `[${req.method}][${req.url}]`;
    if (Object.keys(req.query).length !== 0) {
        log += '\n' + JSON.stringify(req.query);
    }
    _commons_logger__WEBPACK_IMPORTED_MODULE_1__["default"].system.info(log);
    next();
});
router.use(_routes_auth__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);


/***/ }),

/***/ "@graphql-tools/schema":
/*!****************************************!*\
  !*** external "@graphql-tools/schema" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@graphql-tools/schema");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-graphql");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "log4js":
/*!*************************!*\
  !*** external "log4js" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("log4js");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/auths */ "./src/auths/index.ts");
/* harmony import */ var _configs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/configs */ "./src/configs/index.ts");
/* harmony import */ var _commons_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/commons/logger */ "./src/commons/logger.ts");
/* harmony import */ var _graphqls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/graphqls */ "./src/graphqls/index.ts");
/* harmony import */ var _middlewares_error_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/middlewares/error-handler */ "./src/middlewares/error-handler.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/routes */ "./src/routes/index.ts");









const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({ extended: true }));
app.use(_auths__WEBPACK_IMPORTED_MODULE_3__["default"].initialize());
app.use(_commons_logger__WEBPACK_IMPORTED_MODULE_5__["default"].express);
const contextPath = process.env.CONTEXT_PATH || _configs__WEBPACK_IMPORTED_MODULE_4__["default"].context_path || 'express-graphql';
app.use(contextPath, express__WEBPACK_IMPORTED_MODULE_0___default()["static"](path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, 'public')));
app.set('views', path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, 'views'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    }
    else {
        next();
    }
});
app.use(contextPath, _routes__WEBPACK_IMPORTED_MODULE_8__["default"]);
app.use(`${contextPath}graphql`, _graphqls__WEBPACK_IMPORTED_MODULE_6__["default"]);
app.use(_middlewares_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"].notfound);
app.use(_middlewares_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"].error);
app.set('trust proxy', 'loopback');
const port = process.env.PORT || _configs__WEBPACK_IMPORTED_MODULE_4__["default"].server_port || 3000;
const server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(app);
server.listen(port);
server.on('error', (error) => {
    _commons_logger__WEBPACK_IMPORTED_MODULE_5__["default"].system.error(error);
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
    switch (error.code) {
        case 'EACCES':
            _commons_logger__WEBPACK_IMPORTED_MODULE_5__["default"].access.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            _commons_logger__WEBPACK_IMPORTED_MODULE_5__["default"].access.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
});
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port || 3000}`;
    _commons_logger__WEBPACK_IMPORTED_MODULE_5__["default"].system.info(`Listening on ${bind}`);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

})();

/******/ })()
;
//# sourceMappingURL=app.js.map