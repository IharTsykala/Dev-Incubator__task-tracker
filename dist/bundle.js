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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/controller */ "./src/js/controller.js");
/* harmony import */ var _js_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/model */ "./src/js/model.js");
/* harmony import */ var _js_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/view */ "./src/js/view.js");




const wrapper = document.getElementById("wrapper");
const view = new _js_view__WEBPACK_IMPORTED_MODULE_3__["default"](wrapper);
const model = new _js_model__WEBPACK_IMPORTED_MODULE_2__["default"](view);
const controller = new _js_controller__WEBPACK_IMPORTED_MODULE_1__["default"](model, wrapper);
view.initial();
controller.initial();

/***/ }),

/***/ "./src/js/Task.js":
/*!************************!*\
  !*** ./src/js/Task.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Task; });
class Task {
  constructor({
    id,
    title,
    text,
    priority,
    data,
    getTime,
    disabled,
    display,
    colorTask
  }) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.priority = priority;
    this.data = data || this.createData();
    this.getTime = getTime || new Date().getTime();
    this.disabled = disabled || "";
    this.display = display || "grid";
    this.colorTask = colorTask || "red";
  }

  fillContentTask() {
    return `<div class="task__information-block">
    <div class="task__header">
      <h4 class="task__title">${this.title}</h4>
      <p class="task__priority">${this.priority} priority</p>
      <p class="task__data">${this.data}</p>
    </div>
    <p class="task__text">${this.text}</p>
  </div>
  <div class="task__setting">
    <div class="task__modal">
      <div class="task__modal-option task__modal-option_complete_green">
        Complete
      </div>
      <div class="task__modal-option task__modal-option_edit_turquoise">
        Edit
      </div>
      <div class="task__modal-option task__modal-option_delete_red">
        Delete
      </div>
    </div>
    <button id=${this.id} class="task__button" style="display:${this.display}">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>`;
  }

  createData() {
    let hours = new Date().getHours() + "";
    let minutes = new Date().getMinutes() + "";
    let day = new Date().getDate() + "";
    let mount = new Date().getMonth() + 1 + "";
    const year = new Date().getUTCFullYear();
    if (hours.length === 1) hours = "0" + hours;
    if (minutes.length === 1) minutes = "0" + minutes;
    if (day.length === 1) day = "0" + day;
    if (mount.length === 1) mount = "0" + mount;
    return `${hours}:${minutes} ${day}:${mount}:${year}`;
  }

  setColorTask(priority) {
    switch (priority) {
      case "Low":
        return "green";

      case "Medium":
        return "yellow";

      default:
        return "red";
    }
  }

  setDisabled(disabled) {
    if (disabled) {
      this.display = "none";
      this.disabled = "disabled";
    } else {
      this.display = "grid";
      this.disabled = "";
    }
  }

  viewTask(disabled) {
    this.setDisabled(disabled);
    this.colorTask = this.setColorTask(this.priority);
    this.task = document.createElement("div");
    this.task.className = `task task${this.id} task_${this.colorTask} task_${this.disabled}`;
    this.task.innerHTML = this.fillContentTask();
    return this.task;
  }

  removeTask() {
    delete this.task;
  }

}

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controller; });
class Controller {
  constructor(model, wrapper) {
    this.model = model;
    this.wrapper = wrapper;
    this.addTaskWrapper = wrapper.querySelector(".add-task-wrapper");
    this.modalWindow = wrapper.querySelector(".modal-window");
    this.addTask = wrapper.querySelector(".add-task");
    this.addTaskHederClose = wrapper.querySelector(".add-task__header-close-button");
    this.close = wrapper.querySelector(".close");
    this.addTaskToggle = wrapper.querySelector(".add-task-toggle");
    this.toDoArray = wrapper.querySelector(".todo-section__array");
    this.sortUpButton = wrapper.querySelector(".sort__button_up");
    this.sortDownButton = wrapper.querySelector(".sort__button_down");
    this.buttonSetting = wrapper.querySelector(".setting__button");
    this.themeToggle = wrapper.querySelector(".color-theme-toggle__options");
  }

  initial() {
    // modal window
    this.addTaskWrapper.addEventListener("click", () => this.model.toggleModalWindow());
    this.modalWindow.addEventListener("click", () => this.model.toggleModalWindow());
    this.addTask.addEventListener("click", e => e.stopPropagation());
    this.addTaskHederClose.addEventListener("click", () => this.model.toggleModalWindow()); // Modal window add task or Edit

    this.close.addEventListener("click", () => this.model.toggleModalWindow());
    this.addTaskToggle.addEventListener("click", e => this.handlerAddTaskToggle(e)); // close modal for button in the task

    this.wrapper.addEventListener("click", e => {
      if (e.target.className !== "task__button") {
        this.model.toggleTaskModal("wrapper", e);
      }
    }); // click on task with handler on parent

    this.toDoArray.addEventListener("click", e => this.handleClickTask(e)); // sort

    this.sortUpButton.addEventListener("click", () => this.model.setSortUpDate());
    this.sortDownButton.addEventListener("click", () => this.model.setSortDownDate()); // setting modal

    this.buttonSetting.addEventListener("click", () => this.model.setStateSettingModal());
    this.themeToggle.addEventListener("click", e => this.handleChooseTheme(e));
    this.getTaskLocalStorage();
  }

  handlerAddTaskToggle(e) {
    e.preventDefault();
    const inputs = this.addTask.querySelectorAll("input");

    if (inputs[0].value && inputs[1].value) {
      this.model.createTask(inputs);
      this.model.toggleModalWindow();
      inputs[0].value = "";
      inputs[1].value = "";
    }
  }

  handleClickTask(e) {
    if (e.target.className === "task__button") {
      this.model.setCurrentClickTask(e.target.id);
      this.model.setCurrentTaskIndex(e.target.id);
      this.model.toggleTaskModal("task__button", e);
    } else if (e.target.innerHTML.trim() === "Complete") {
      this.model.completeTask();
    } else if (e.target.innerHTML.trim() === "Edit") {
      this.model.editTask(this.addTask.querySelectorAll("input"));
    } else if (e.target.innerHTML.trim() === "Delete") {
      this.model.removeTask();
    }
  }

  handleChooseTheme(e) {
    if (e.target.value) this.model.setColorTheme(e.target.value);
  }

  getTaskLocalStorage() {
    const inputs = this.themeToggle.querySelectorAll("input");
    this.model.getTaskLocalStorage(inputs);
  }

}

/***/ }),

/***/ "./src/js/model.js":
/*!*************************!*\
  !*** ./src/js/model.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/js/Task.js");

class Model {
  constructor(view) {
    this.view = view;
    this.arrayToDoTask = [];
    this.arrayComplectedTask = [];
    this.idTask = 1;
    this.modalWindow = false;
    this.modalWindowForEdit = false;
    this.taskModal = false;
    this.currentClickTask = null;
    this.modalSetting = false;
    this.colorTheme = "light";
    this.currentClickTaskIndex = null;
    this.prevClickTaskIndex = null;
    this.idCurrentTask = null;
    this.idPrevTask = null;
  }

  getTaskLocalStorage(inputs) {
    // tasks
    if (Array.isArray(JSON.parse(localStorage.getItem("arrayToDo"))) && Array.isArray(JSON.parse(localStorage.getItem("arrayComplected")))) {
      this.arrayToDoTask = JSON.parse(localStorage.getItem("arrayToDo"));
      this.arrayComplectedTask = JSON.parse(localStorage.getItem("arrayComplected"));
      this.arrayToDoTask = this.arrayToDoTask.map(task => new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](task));
      this.arrayComplectedTask = this.arrayComplectedTask.map(task => new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](task));
    }

    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask); // idTask

    this.idTask = localStorage.getItem("idTask") || 1; // color theme

    const colorTheme = localStorage.getItem("colorTheme") || "light";

    for (const input of inputs) {
      if (input.value === colorTheme) input.checked = true;
    }

    this.setColorTheme(colorTheme);
  }

  createTask(inputs) {
    if (inputs && inputs[0].value && inputs[1].value) {
      const priority = Array.from(inputs).find(item => item.checked); // Edit exist task

      if (this.modalWindowForEdit) {
        this.currentClickTask.title = inputs[0].value;
        this.currentClickTask.text = inputs[1].value;
        this.currentClickTask.priority = priority.value;
      } else {
        // add new task
        const task = {
          id: this.idTask++,
          title: inputs[0].value,
          text: inputs[1].value,
          priority: priority.value
        };
        const newTask = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](task);
        this.arrayToDoTask = this.arrayToDoTask.concat(newTask);
        localStorage.setItem("idTask", this.idTask);
      }

      this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask);
    }

    this.modalWindowForEdit = false;
  }

  toggleModalWindow() {
    this.modalWindow = !this.modalWindow;
    this.view.viewModalWindow(this.modalWindow);
  }

  setCurrentClickTask(id) {
    this.currentClickTask = this.arrayToDoTask.find(item => item.id === +id);
  }

  setCurrentTaskIndex(id) {
    this.currentClickTaskIndex = this.arrayToDoTask.findIndex(item => item.id === +id);
    this.idPrevTask = this.idCurrentTask;
    this.idCurrentTask = +id;
  }

  toggleTaskModal(targetClick, e) {
    // click only button
    if (targetClick === "task__button" && this.idCurrentTask !== this.idPrevTask || targetClick === "task__button" && this.idCurrentTask === this.idPrevTask && this.taskModal === false) {
      e.stopPropagation();
      this.taskModal = true;
      this.view.viewTaskModal(this.taskModal, this.currentClickTaskIndex); // click on wrapper or same button
    } else if (targetClick === "wrapper" && this.taskModal || targetClick === "task__button" && this.idCurrentTask === this.idPrevTask) {
      this.taskModal = false;
      this.view.viewTaskModal(this.taskModal);
    }
  }

  setStateSettingModal() {
    this.modalSetting = !this.modalSetting;
    this.view.setStateSettingModal(this.modalSetting);
  }

  setColorTheme(color) {
    this.colorTheme = color;
    this.view.setColorTheme(this.colorTheme);
  }

  completeTask() {
    this.arrayToDoTask = this.arrayToDoTask.filter(item => item.id !== this.currentClickTask.id);
    this.arrayComplectedTask = this.arrayComplectedTask.concat(this.currentClickTask);
    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask);
  }

  editTask(inputs) {
    this.modalWindowForEdit = true;
    this.toggleModalWindow();
    inputs[0].value = this.currentClickTask.title;
    inputs[1].value = this.currentClickTask.text;

    for (const input of inputs) {
      if (input.value === this.currentClickTask.priority) input.checked = true;
    }
  }

  removeTask() {
    this.arrayToDoTask = this.arrayToDoTask.filter(item => item.id !== this.currentClickTask.id);
    this.view.viewArrayTask(this.arrayToDoTask);
  }

  setSortUpDate() {
    this.arrayToDoTask = this.arrayToDoTask.sort((a, b) => a.getDate > b.getDate ? 1 : 1);
    this.view.viewArrayTask(this.arrayToDoTask);
  }

  setSortDownDate() {
    this.arrayToDoTask = this.arrayToDoTask.sort((a, b) => a.getDate < b.getDate ? 1 : -1);
    this.view.viewArrayTask(this.arrayToDoTask);
  }

}

/***/ }),

/***/ "./src/js/view.js":
/*!************************!*\
  !*** ./src/js/view.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return View; });
class View {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.arrayToDoTask = wrapper.querySelector(".todo-section__array");
    this.arrayComplectedTask = wrapper.querySelector(".complected-section__array");
    this.modalWindow = wrapper.querySelector(".modal-window");
    this.settingModal = wrapper.querySelector(".setting__modal-window");
    this.navbar = wrapper.querySelector(".navbar");
    this.toDoSectionHeader = wrapper.querySelector(".todo-section__header");
    this.complectedSectionHeader = wrapper.querySelector(".complected-section__header");
  }

  initial() {
    this.writeToDoTask(0);
    this.writeCompletedTask(0);
  }

  viewArrayTask(arrayToDo, arrayComplected) {
    // clear DOM
    if (arrayToDo) {
      while (this.arrayToDoTask.children.length) {
        this.arrayToDoTask.children[0].remove();
      } // render arrays in DOM


      arrayToDo.forEach(item => this.arrayToDoTask.append(item.viewTask()));
    } // same if task completed


    if (arrayComplected) {
      while (this.arrayComplectedTask.children.length) {
        this.arrayComplectedTask.children[0].remove();
      }

      arrayComplected.map(item => this.arrayComplectedTask.append(item.viewTask(true)));
    } // taskModel had created


    this.taskModalsCollections = this.wrapper.querySelectorAll(".task__modal"); // amount tasks

    if (arrayToDo) {
      this.writeToDoTask(arrayToDo.length);
    }

    if (arrayComplected) {
      this.writeCompletedTask(arrayComplected.length);
    } // localStorage


    this.setTasksLocalStorage(arrayToDo, arrayComplected);
  }

  writeToDoTask(amountTask) {
    this.toDoSectionHeader.textContent = this.toDoSectionHeader.textContent.slice(0, 4) + ` (${amountTask})`;
  }

  writeCompletedTask(amountTask) {
    this.complectedSectionHeader.textContent = this.complectedSectionHeader.textContent.slice(0, 10) + ` (${amountTask})`;
  }

  setTasksLocalStorage(arrayToDo, arrayComplected) {
    localStorage.setItem("arrayToDo", JSON.stringify(arrayToDo));

    if (arrayComplected) {
      localStorage.setItem("arrayComplected", JSON.stringify(arrayComplected));
    }
  }

  setColorTheme(color) {
    if (this.wrapper.classList[1]) {
      this.wrapper.classList.remove(this.wrapper.classList[1]);
    }

    this.wrapper.classList.add(`wrapper__theme_${color}`);

    if (this.navbar.classList[1]) {
      this.navbar.classList.remove(this.navbar.classList[1]);
    }

    this.navbar.classList.add(`navbar__theme_${color}`);
    localStorage.setItem("colorTheme", color);
  }

  checkBoolean(booleanValue, modalWindow) {
    if (booleanValue) modalWindow.style.display = "grid";else modalWindow.style.display = "";
  }

  viewModalWindow(booleanValue) {
    this.checkBoolean(booleanValue, this.modalWindow);
  }

  viewTaskModal(booleanValue, currentTaskToDoIndex) {
    if (this.taskModalsCollections) {
      // close previously modal
      for (const item of this.taskModalsCollections) {
        item.style.display = "";
      } // define current task


      this.taskModal = this.taskModalsCollections[currentTaskToDoIndex];
      if (this.taskModal) this.checkBoolean(booleanValue, this.taskModal);
    }
  }

  setStateSettingModal(booleanValue) {
    this.checkBoolean(booleanValue, this.settingModal);
  }

}

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map