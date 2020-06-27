export default class View {
  constructor(wrapper) {
    this.wrapper = wrapper
    this.arrayToDoTask = wrapper.querySelector(".todo-section__array")
    this.arrayComplectedTask = wrapper.querySelector(
      ".complected-section__array"
    )
    this.modalWindow = wrapper.querySelector(".modal-window")
    this.settingModal = wrapper.querySelector(".setting__modal-window")
    this.navbar = wrapper.querySelector(".navbar")
    this.toDoSectionHeader = wrapper.querySelector(".todo-section__header")
    this.complectedSectionHeader = wrapper.querySelector(
      ".complected-section__header"
    )
  }

  initial() {
    this.writeToDoTask(0)
    this.writeCompletedTask(0)
  }

  viewArrayTask(arrayToDo, arrayComplected) {
    // clear DOM
    if (arrayToDo) {
      while (this.arrayToDoTask.children.length) {
        this.arrayToDoTask.children[0].remove()
      }
      // render arrays in DOM
      arrayToDo.forEach((item) => this.arrayToDoTask.append(item.viewTask()))
    }
    // same if task completed
    if (arrayComplected) {
      while (this.arrayComplectedTask.children.length) {
        this.arrayComplectedTask.children[0].remove()
      }
      arrayComplected.map((item) =>
        this.arrayComplectedTask.append(item.viewTask(true))
      )
    }

    // taskModel had created
    this.taskModalsCollections = this.wrapper.querySelectorAll(".task__modal")

    // amount tasks
    if (arrayToDo) {
      this.writeToDoTask(arrayToDo.length)
    }
    if (arrayComplected) {
      this.writeCompletedTask(arrayComplected.length)
    }

    // localStorage
    this.setTasksLocalStorage(arrayToDo, arrayComplected)
  }

  writeToDoTask(amountTask) {
    this.toDoSectionHeader.textContent =
      this.toDoSectionHeader.textContent.slice(0, 4) + ` (${amountTask})`
  }

  writeCompletedTask(amountTask) {
    this.complectedSectionHeader.textContent =
      this.complectedSectionHeader.textContent.slice(0, 10) + ` (${amountTask})`
  }

  setTasksLocalStorage(arrayToDo, arrayComplected) {
    localStorage.setItem("arrayToDo", JSON.stringify(arrayToDo))
    if (arrayComplected) {
      localStorage.setItem("arrayComplected", JSON.stringify(arrayComplected))
    }
  }

  setColorTheme(color) {
    if (this.wrapper.classList[1]) {
      this.wrapper.classList.remove(this.wrapper.classList[1])
    }
    this.wrapper.classList.add(`wrapper__theme_${color}`)

    if (this.navbar.classList[1]) {
      this.navbar.classList.remove(this.navbar.classList[1])
    }
    this.navbar.classList.add(`navbar__theme_${color}`)

    localStorage.setItem("colorTheme", color)
  }

  checkBoolean(booleanValue, modalWindow) {
    if (booleanValue) modalWindow.style.display = "grid"
    else modalWindow.style.display = ""
  }

  viewModalWindow(booleanValue) {
    this.checkBoolean(booleanValue, this.modalWindow)
  }

  viewTaskModal(booleanValue, currentTaskToDoIndex) {
    if (this.taskModalsCollections) {
      // close previously modal
      for (const item of this.taskModalsCollections) {
        item.style.display = ""
      }
      // define current task
      this.taskModal = this.taskModalsCollections[currentTaskToDoIndex]
      if (this.taskModal) this.checkBoolean(booleanValue, this.taskModal)
    }
  }

  setStateSettingModal(booleanValue) {
    this.checkBoolean(booleanValue, this.settingModal)
  }
}
