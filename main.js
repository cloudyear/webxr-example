/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/attack.js":
/*!***********************!*\
  !*** ./src/attack.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"attack\": () => (/* binding */ attack)\n/* harmony export */ });\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ \"./src/constant.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/**\n * 角色攻击相关逻辑\n */\n\n\nconst scene = document.querySelector('a-scene');\nconst shootingSoundPlayer = document.querySelector('#shooting_sound_player');\nconst attack = function (point) {\n  attackEntity();\n  createAttackEntity(point);\n}; // 创建攻击实体\n\nfunction createAttackEntity(point) {\n  const {\n    newX,\n    newY,\n    newZ\n  } = getPosition(point);\n  const attackEntity = document.createElement('a-sphere');\n  attackEntity.setAttribute('radius', '0.2');\n  attackEntity.setAttribute('color', 'red');\n  attackEntity.setAttribute('position', `${newX} ${newY} ${newZ}`);\n  attackEntity.setAttribute('animation', `property: position; dur: ${_constant__WEBPACK_IMPORTED_MODULE_0__.AttackDelay}; to: ${point.x} ${point.y} ${point.z};`);\n  scene?.appendChild(attackEntity);\n  destroyAttackEntity(scene, attackEntity);\n} // 销毁实体\n\n\nfunction destroyAttackEntity(parent, entity) {\n  const timer = setTimeout(() => {\n    parent.removeChild(entity);\n    clearTimeout(timer);\n  }, _constant__WEBPACK_IMPORTED_MODULE_0__.AttackDelay);\n} // 发射子弹\n\n\nfunction attackEntity() {\n  // 声音\n  // @ts-ignore\n  shootingSoundPlayer?.components.sound.playSound(); // @ts-ignore\n\n  const entity = window.CursorFocusEntity;\n\n  if (entity === 'start') {\n    const timer = setTimeout(() => {\n      // @ts-ignore\n      window.CursorFocusEntity = null;\n      (0,_game__WEBPACK_IMPORTED_MODULE_1__.startGame)();\n      clearTimeout(timer);\n    }, _constant__WEBPACK_IMPORTED_MODULE_0__.AttackDelay);\n  } else if (entity === 'restart') {\n    const timer = setTimeout(() => {\n      // @ts-ignore\n      window.CursorFocusEntity = null;\n      (0,_game__WEBPACK_IMPORTED_MODULE_1__.restartGame)();\n      clearTimeout(timer);\n    }, _constant__WEBPACK_IMPORTED_MODULE_0__.AttackDelay);\n  } else if (entity) {\n    attackEnemy(entity);\n  }\n} // 播放声音\n// 对敌人造成伤害\n\n\nfunction attackEnemy(enemyEntity) {\n  // @ts-ignore\n  const enemy = window.EnemyMap.get(enemyEntity);\n  const timer = setTimeout(() => {\n    enemy.beAttacked();\n    clearTimeout(timer);\n  }, _constant__WEBPACK_IMPORTED_MODULE_0__.AttackDelay);\n} // 获取子弹初始发射位置\n\n\nfunction getPosition(point) {\n  const {\n    x,\n    y,\n    z\n  } = point; // x, z 平面的角度\n\n  const tanXZ = x / z;\n  const degXZ = z > 0 ? 180 + Math.round(Math.atan(tanXZ) / (Math.PI / 180)) : Math.round(Math.atan(tanXZ) / (Math.PI / 180)); // y, z 平面的角度\n  // @ts-ignore\n\n  const tanYZ = (y - window.InitHeight) / Math.abs(z);\n  const degYZ = Math.round(Math.atan(tanYZ) / (Math.PI / 180)); // 计算新的子弹发射位置\n\n  const {\n    newX,\n    newY: newZ\n  } = getPointByDegRotate({\n    x: 0,\n    y: 0\n  }, {\n    x1: 0.5,\n    y1: -2\n  }, -degXZ * Math.PI / 180);\n  const {\n    newX: newY\n  } = getPointByDegRotate( // @ts-ignore\n  {\n    x: window.InitHeight,\n    y: 0\n  }, {\n    x1: 1.3,\n    y1: -2\n  }, degYZ * Math.PI / 180);\n  return {\n    newX,\n    newZ,\n    newY\n  };\n}\n\nfunction getPointByDegRotate(basePoint, oldPoint, radian) {\n  const {\n    x,\n    y\n  } = basePoint;\n  const {\n    x1,\n    y1\n  } = oldPoint;\n  const newX = (x1 - x) * Math.cos(radian) - (y1 - y) * Math.sin(radian) + x;\n  const newY = (y1 - y) * Math.cos(radian) + (x1 - x) * Math.sin(radian) + y;\n  return {\n    newX,\n    newY\n  };\n}\n\n//# sourceURL=webpack://webxr-game/./src/attack.js?");

/***/ }),

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attack */ \"./src/attack.js\");\n// @ts-nocheck\n\nAFRAME.registerComponent('cursor-listener', {\n  schema: {},\n  init: function () {\n    // 点击进行攻击\n    this.el.addEventListener('click', function (evt) {\n      (0,_attack__WEBPACK_IMPORTED_MODULE_0__.attack)(evt.detail.intersection.point);\n    });\n  },\n  update: function () {// Do something when component's data is updated.\n  },\n  remove: function () {// Do something the component or its entity is detached.\n  },\n  tick: function (time, timeDelta) {// Do something on every scene tick or frame.\n  }\n});\nAFRAME.registerComponent('can-be-attacked', {\n  schema: {},\n  init: function () {\n    // Do something when component first attached.\n    this.el.addEventListener('mouseenter', () => {\n      window.CursorFocusEntity = this.el;\n    });\n    this.el.addEventListener('mouseleave', () => {\n      window.CursorFocusEntity = null;\n    });\n  },\n  update: function () {// Do something when component's data is updated.\n  },\n  remove: function () {// Do something the component or its entity is detached.\n  },\n  tick: function (time, timeDelta) {// Do something on every scene tick or frame.\n  }\n});\nAFRAME.registerComponent('start-focus', {\n  init: function () {\n    this.el.addEventListener('mouseenter', function () {\n      if (window.startLeaveTimer) {\n        clearTimeout(window.startLeaveTimer);\n        window.startLeaveTimer = null;\n      }\n\n      window.CursorFocusEntity = 'start';\n      this.setAttribute('scale', '12 12 12');\n      this.setAttribute('color', 'orange');\n    });\n    this.el.addEventListener('mouseleave', function () {\n      window.startLeaveTimer = setTimeout(() => {\n        window.CursorFocusEntity = null;\n        this.setAttribute('scale', '10 10 10');\n        this.setAttribute('color', '#bbb');\n      }, 500);\n    });\n  }\n});\nAFRAME.registerComponent('restart-focus', {\n  init: function () {\n    this.el.addEventListener('mouseenter', function () {\n      console.log(111);\n\n      if (window.restartLeaveTimer) {\n        clearTimeout(window.restartLeaveTimer);\n        window.restartLeaveTimer = null;\n      }\n\n      window.CursorFocusEntity = 'restart';\n      this.setAttribute('scale', '12 12 12');\n      this.setAttribute('color', 'orange');\n    });\n    this.el.addEventListener('mouseleave', function () {\n      window.restartLeaveTimer = setTimeout(() => {\n        window.CursorFocusEntity = null;\n        this.setAttribute('scale', '10 10 10');\n        this.setAttribute('color', '#bbb');\n      }, 500);\n    });\n  }\n});\n\n//# sourceURL=webpack://webxr-game/./src/components.js?");

/***/ }),

/***/ "./src/constant.js":
/*!*************************!*\
  !*** ./src/constant.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Enemies\": () => (/* binding */ Enemies),\n/* harmony export */   \"Hurt\": () => (/* binding */ Hurt),\n/* harmony export */   \"AttackDelay\": () => (/* binding */ AttackDelay),\n/* harmony export */   \"EnemyGenerateDelay\": () => (/* binding */ EnemyGenerateDelay)\n/* harmony export */ });\nconst Enemies = [{\n  name: 'druid',\n  scale: '1.3 1.3 1.3',\n  attack: {\n    scale: '0.1 0.1 0.1',\n    hurt: 10,\n    delay: 9\n  },\n  hp: 60,\n  score: 8\n}, {\n  name: 'korrigan-hat',\n  scale: '4 4 4',\n  attack: {\n    scale: '0.05 0.05 0.05',\n    hurt: 7,\n    delay: 7\n  },\n  hp: 50,\n  score: 6\n}, {\n  name: 'ankou-with-cart',\n  scale: '0.8 0.8 0.8',\n  attack: {\n    scale: '0.1 0.1 0.1',\n    hurt: 8,\n    delay: 8\n  },\n  hp: 100,\n  score: 10\n}, {\n  name: 'witch',\n  scale: '1 1 1',\n  attack: {\n    scale: '0.1 0.1 0.1',\n    hurt: 6,\n    delay: 5\n  },\n  hp: 40,\n  score: 5\n}, {\n  name: 'bear',\n  scale: '1 1 1',\n  attack: {\n    scale: '0.1 0.1 0.1',\n    hurt: 5,\n    delay: 5\n  },\n  hp: 60,\n  score: 7\n}, {\n  name: 'korrigan-wolf',\n  scale: '3 3 3',\n  attack: {\n    scale: '0.06 0.06 0.06',\n    hurt: 5,\n    delay: 6\n  },\n  hp: 80,\n  score: 7\n}];\nconst Hurt = 15; // 角色攻击伤害\n\nconst AttackDelay = 300; // 角色攻击间隔\n\nconst EnemyGenerateDelay = 10000; // 敌人生成间隔\n\n//# sourceURL=webpack://webxr-game/./src/constant.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Enemy\": () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ \"./src/constant.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n // scene\n\nconst scene = document.querySelector('a-scene');\nconst enemyDeathSound = document.querySelector('#enemy_death_sound_player');\nclass Enemy {\n  constructor() {\n    this.person = createRandomEnemy();\n    this.location = createRandomLocation();\n    this.entity = this.createEntity();\n    this.sounds = {\n      hit: this.createShootSound(),\n      appear: this.createAppearSound()\n    };\n    this.attackTimer = null;\n    this.destroyed = false;\n  }\n\n  init() {\n    // 挂载实体\n    this.entity.appendChild(this.sounds.hit);\n    this.entity.appendChild(this.sounds.appear);\n    scene?.appendChild(this.entity);\n    setTimeout(() => {\n      // @ts-ignore\n      this.sounds.appear.components.sound.playSound();\n    }, 0);\n    this.attackTimer = setInterval(() => this.attack(), this.person.attack.delay * 1000);\n  } // 生成实体\n\n\n  createEntity() {\n    const entity = document.createElement('a-gltf-model');\n    entity.setAttribute('src', `#${this.person.name}`);\n    entity.setAttribute('scale', `${this.person.scale}`);\n    entity.setAttribute('position', `${this.location.x} ${this.location.y} ${this.location.z}`);\n    entity.setAttribute('rotation', `${this.location.degX} ${this.location.degY} ${this.location.degZ}`);\n    entity.setAttribute('can-be-attacked', ''); // @ts-ignore\n\n    window.EnemyMap.set(entity, this);\n    return entity;\n  } // 创建声音\n\n\n  createShootSound() {\n    const sound = document.createElement('a-entity');\n    sound.setAttribute('sound', 'src: #hit-sound');\n    sound.setAttribute('position', '0 0 0');\n    sound.setAttribute('poolSize', '10');\n    return sound;\n  }\n\n  createAppearSound() {\n    const sound = document.createElement('a-entity');\n    sound.setAttribute('sound', 'src: #enemy-appear-sound');\n    sound.setAttribute('position', '0 0 0');\n    sound.setAttribute('poolSize', '10');\n    return sound;\n  } // 攻击\n\n\n  attack() {\n    const attackEntity = this.createAttackEntity();\n    scene?.appendChild(attackEntity);\n    const timer = setTimeout(() => {\n      // @ts-ignore\n      if (window.GameHP <= 0) {\n        return;\n      } // @ts-ignore\n\n\n      window.GameHP -= this.person.attack.hurt;\n      (0,_game__WEBPACK_IMPORTED_MODULE_1__.updateGameHP)(); // @ts-ignore\n\n      if (window.GameHP <= 0) {\n        (0,_game__WEBPACK_IMPORTED_MODULE_1__.endGame)();\n      }\n\n      scene?.removeChild(attackEntity);\n      clearTimeout(timer);\n    }, 1000);\n  } // 被攻击\n\n\n  beAttacked() {\n    if (this.destroyed) {\n      return;\n    } // @ts-ignore\n\n\n    this.sounds.hit.components.sound.playSound();\n    this.person.hp -= _constant__WEBPACK_IMPORTED_MODULE_0__.Hurt;\n\n    if (this.person.hp <= 0) {\n      // @ts-ignore\n      enemyDeathSound.components.sound.playSound();\n      this.destroy(); // @ts-ignore\n\n      window.GameScore += this.person.score;\n      (0,_game__WEBPACK_IMPORTED_MODULE_1__.updateGameScore)();\n    }\n  } // 生成攻击实体\n\n\n  createAttackEntity() {\n    const entity = document.createElement('a-gltf-model');\n    entity.setAttribute('src', `#${this.person.name}-attack`);\n    entity.setAttribute('scale', `${this.person.attack.scale}`);\n    entity.setAttribute('position', `${this.location.x} 1.5 ${this.location.z}`);\n    entity.setAttribute('rotation', `${this.location.degX} ${this.location.degY} ${this.location.degZ}`);\n    entity.setAttribute('animation', 'property: position; dur: 1000; to: 0 1.5 0;');\n    return entity;\n  } // 销毁\n\n\n  destroy() {\n    this.destroyed = true;\n\n    if (this.attackTimer) {\n      clearInterval(this.attackTimer);\n      this.attackTimer = null;\n    } // @ts-ignore\n\n\n    window.EnemyMap.delete(this.entity);\n    scene?.removeChild(this.entity);\n  }\n\n} // 生成随机敌人\n\nconst createRandomEnemy = () => {\n  const index = Math.floor(Math.random() * _constant__WEBPACK_IMPORTED_MODULE_0__.Enemies.length);\n  return JSON.parse(JSON.stringify(_constant__WEBPACK_IMPORTED_MODULE_0__.Enemies[index]));\n}; // 生成随机位置\n\n\nconst createRandomLocation = () => {\n  const x = (Math.floor(Math.random() * 5) + 3) * (Math.random() < 0.5 ? 1 : -1);\n  const z = (Math.floor(Math.random() * 5) + 3) * (Math.random() < 0.5 ? 1 : -1);\n  const deg = getEnemyRotateDeg(x, z);\n  return {\n    x,\n    y: 0,\n    z,\n    degX: 0,\n    degY: deg,\n    degZ: 0\n  };\n}; // 根据 x，z 获得敌人需要旋转的角度\n\n\nconst getEnemyRotateDeg = (x, z) => {\n  const tan = x / z;\n  const deg = Math.round(Math.atan(tan) / (Math.PI / 180));\n  return z > 0 ? 180 + deg : deg;\n};\n\n//# sourceURL=webpack://webxr-game/./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateGameHP\": () => (/* binding */ updateGameHP),\n/* harmony export */   \"hideGameHP\": () => (/* binding */ hideGameHP),\n/* harmony export */   \"updateGameScore\": () => (/* binding */ updateGameScore),\n/* harmony export */   \"hideStart\": () => (/* binding */ hideStart),\n/* harmony export */   \"hideRestart\": () => (/* binding */ hideRestart),\n/* harmony export */   \"showRestart\": () => (/* binding */ showRestart),\n/* harmony export */   \"hideGameOver\": () => (/* binding */ hideGameOver),\n/* harmony export */   \"showGameOver\": () => (/* binding */ showGameOver),\n/* harmony export */   \"startGame\": () => (/* binding */ startGame),\n/* harmony export */   \"restartGame\": () => (/* binding */ restartGame),\n/* harmony export */   \"endGame\": () => (/* binding */ endGame)\n/* harmony export */ });\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\n/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ \"./src/constant.js\");\n\n\nlet enemyGenerator = null;\nconst restartText = document.querySelector('#restart-text');\nconst gameOverSound = document.querySelector('#gameover_sound_player');\nconst scene = document.querySelector('a-scene');\nconst updateGameHP = () => {\n  const text = document.querySelector('#hp-text'); // @ts-ignore\n\n  text?.setAttribute('value', `HP: ${window.GameHP > 0 ? window.GameHP : 0}`);\n};\nconst hideGameHP = () => {\n  const text = document.querySelector('#hp-text');\n  text?.setAttribute('value', '');\n};\nconst updateGameScore = () => {\n  const text = document.querySelector('#score-text'); // @ts-ignore\n\n  text?.setAttribute('value', `Score: ${window.GameScore}`);\n};\nconst hideStart = () => {\n  const text = document.querySelector('#start-text');\n  text?.setAttribute('value', '');\n};\nconst hideRestart = () => {\n  // @ts-ignore\n  scene?.removeChild(restartText);\n};\nconst showRestart = () => {\n  // @ts-ignore\n  scene?.appendChild(restartText);\n};\nconst hideGameOver = () => {\n  const text = document.querySelector('#end-text');\n  text?.setAttribute('value', '');\n};\nconst showGameOver = () => {\n  const text = document.querySelector('#end-text');\n  text?.setAttribute('value', 'Game Over!');\n};\nconst startGame = () => {\n  hideStart();\n  updateGameHP();\n  updateGameScore();\n  enemyGenerator = setInterval(() => {\n    const enemy = new _enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy();\n    enemy.init();\n    enemy.attack();\n  }, _constant__WEBPACK_IMPORTED_MODULE_1__.EnemyGenerateDelay);\n};\nconst restartGame = () => {\n  hideRestart();\n  hideGameOver(); // @ts-ignore\n\n  window.GameHP = 100; // @ts-ignore\n\n  window.GameScore = 0;\n  updateGameHP();\n  updateGameScore();\n  enemyGenerator = setInterval(() => {\n    const enemy = new _enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy();\n    enemy.init();\n    enemy.attack();\n  }, _constant__WEBPACK_IMPORTED_MODULE_1__.EnemyGenerateDelay);\n};\nconst endGame = () => {\n  clearInterval(enemyGenerator);\n  enemyGenerator = null; // @ts-ignore\n\n  window.EnemyMap.forEach((enemy, key) => {\n    enemy.destroy();\n  }); // @ts-ignore\n\n  gameOverSound.components.sound.playSound();\n  hideGameHP();\n  showGameOver();\n  showRestart();\n};\nhideRestart();\n\n//# sourceURL=webpack://webxr-game/./src/game.js?");

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/***/ (() => {

eval("// @ts-nocheck\nwindow.GameHP = 100;\nwindow.GameScore = 0;\nwindow.CursorFocusEntity = null;\nwindow.InitHeight = 1.6;\nwindow.EnemyMap = new Map();\n\n//# sourceURL=webpack://webxr-game/./src/global.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ \"./src/global.js\");\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./src/components.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n//# sourceURL=webpack://webxr-game/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;