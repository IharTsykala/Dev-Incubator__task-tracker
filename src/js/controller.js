export default class Controller {
  constructor(model, wrapper) {
    this.model = model
    this.wrapper = wrapper
    this.addTaskWrapper = wrapper.querySelector(".add-task-wrapper")
    this.modalWindow = wrapper.querySelector(".modal-window")
    this.addTask = wrapper.querySelector(".add-task")
    this.addTaskHederClose = wrapper.querySelector(
      ".add-task__header-close-button"
    )
    this.close = wrapper.querySelector(".close")
    this.addTaskToggle = wrapper.querySelector(".add-task-toggle")
    this.toDoArray = wrapper.querySelector(".todo-section__array")
    this.sortUpButton = wrapper.querySelector(".sort__button_up")
    this.sortDownButton = wrapper.querySelector(".sort__button_down")
    this.buttonSetting = wrapper.querySelector(".setting__button")
    this.themeToggle = wrapper.querySelector(".color-theme-toggle__options")
  }

  initial() {
    // modal window
    this.addTaskWrapper.addEventListener("click", () =>
      this.model.toggleModalWindow()
    )
    this.modalWindow.addEventListener("click", () =>
      this.model.toggleModalWindow()
    )
    this.addTask.addEventListener("click", (e) => e.stopPropagation())
    this.addTaskHederClose.addEventListener("click", () =>
      this.model.toggleModalWindow()
    )
    // Modal window add task or Edit
    this.close.addEventListener("click", () => this.model.toggleModalWindow())
    this.addTaskToggle.addEventListener("click", (e) =>
      this.handlerAddTaskToggle(e)
    )
    // close modal for button in the task
    this.wrapper.addEventListener("click", (e) => {
      if (e.target.className !== "task__button") {
        this.model.toggleTaskModal("wrapper", e)
      }
    })
    // click on task with handler on parent
    this.toDoArray.addEventListener("click", (e) => this.handleClickTask(e))
    // sort
    this.sortUpButton.addEventListener("click", () =>
      this.model.setSortUpDate()
    )
    this.sortDownButton.addEventListener("click", () =>
      this.model.setSortDownDate()
    )
    // setting modal
    this.buttonSetting.addEventListener("click", () =>
      this.model.setStateSettingModal()
    )
    this.themeToggle.addEventListener("click", (e) => this.handleChooseTheme(e))

    this.getTaskLocalStorage()
  }

  handlerAddTaskToggle(e) {
    e.preventDefault()
    const inputs = this.addTask.querySelectorAll("input")
    if (inputs[0].value && inputs[1].value) {
      this.model.createTask(inputs)
      this.model.toggleModalWindow()
      inputs[0].value = ""
      inputs[1].value = ""
    }
  }

  handleClickTask(e) {
    if (e.target.className === "task__button") {
      this.model.setCurrentClickTask(e.target.id)
      this.model.setCurrentTaskIndex(e.target.id)
      this.model.toggleTaskModal("task__button", e)
    } else if (e.target.innerHTML.trim() === "Complete") {
      this.model.completeTask()
    } else if (e.target.innerHTML.trim() === "Edit") {
      this.model.editTask(this.addTask.querySelectorAll("input"))
    } else if (e.target.innerHTML.trim() === "Delete") {
      this.model.removeTask()
    }
  }

  handleChooseTheme(e) {
    if (e.target.value) this.model.setColorTheme(e.target.value)
  }

  getTaskLocalStorage() {
    const inputs = this.themeToggle.querySelectorAll("input")
    this.model.getTaskLocalStorage(inputs)
  }
}
