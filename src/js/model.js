import Task from './Task'

export default class Model {
  constructor(view) {
    this.view = view
    this.arrayToDoTask = []
    this.arrayComplectedTask = []
    this.idTask = 1
    this.modalWindow = false
    this.modalWindowForEdit = false
    this.taskModal = false
    this.currentClickTask = null
    this.modalSetting = false
    this.colorTheme = "light"
    this.currentClickTaskIndex = null
    this.prevClickTaskIndex = null
    this.idCurrentTask = null
    this.idPrevTask = null
  }

  getTaskLocalStorage(inputs) {
    // tasks
    if (
      Array.isArray(JSON.parse(localStorage.getItem("arrayToDo"))) &&
      Array.isArray(JSON.parse(localStorage.getItem("arrayComplected")))
    ) {
      this.arrayToDoTask = JSON.parse(localStorage.getItem("arrayToDo"))
      this.arrayComplectedTask = JSON.parse(
        localStorage.getItem("arrayComplected")
      )

      this.arrayToDoTask = this.arrayToDoTask.map((task) => new Task(task))
      this.arrayComplectedTask = this.arrayComplectedTask.map(
        (task) => new Task(task)
      )
    }
    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)

    // idTask
    this.idTask = localStorage.getItem("idTask") || 1

    // color theme
    const colorTheme = localStorage.getItem("colorTheme") || "light"

    for (const input of inputs) {
      if (input.value === colorTheme) input.checked = true
    }
    this.setColorTheme(colorTheme)
  }

  createTask(inputs) {
    if (inputs && inputs[0].value && inputs[1].value) {
      const priority = Array.from(inputs).find((item) => item.checked)
      // Edit exist task
      if (this.modalWindowForEdit) {
        this.currentClickTask.title = inputs[0].value
        this.currentClickTask.text = inputs[1].value
        this.currentClickTask.priority = priority.value
      } else {
        // add new task
        const task = {
          id: this.idTask++,
          title: inputs[0].value,
          text: inputs[1].value,
          priority: priority.value,
        }
        const newTask = new Task(task)
        this.arrayToDoTask = this.arrayToDoTask.concat(newTask)
        localStorage.setItem("idTask", this.idTask)
      }
      this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
    }
    this.modalWindowForEdit = false
  }

  toggleModalWindow() {
    this.modalWindow = !this.modalWindow
    this.view.viewModalWindow(this.modalWindow)
  }

  setCurrentClickTask(id) {
    this.currentClickTask = this.arrayToDoTask.find((item) => item.id === +id)
  }

  setCurrentTaskIndex(id) {
    this.currentClickTaskIndex = this.arrayToDoTask.findIndex(
      (item) => item.id === +id
    )
    this.idPrevTask = this.idCurrentTask
    this.idCurrentTask = +id
  }

  toggleTaskModal(targetClick, e) {
    // click only button
    if (
      (targetClick === "task__button" &&
        this.idCurrentTask !== this.idPrevTask) ||
      (targetClick === "task__button" &&
        this.idCurrentTask === this.idPrevTask &&
        this.taskModal === false)
    ) {
      e.stopPropagation()
      this.taskModal = true
      this.view.viewTaskModal(this.taskModal, this.currentClickTaskIndex)
      // click on wrapper or same button
    } else if (
      (targetClick === "wrapper" && this.taskModal) ||
      (targetClick === "task__button" && this.idCurrentTask === this.idPrevTask)
    ) {
      this.taskModal = false
      this.view.viewTaskModal(this.taskModal)
    }
  }

  setStateSettingModal() {
    this.modalSetting = !this.modalSetting
    this.view.setStateSettingModal(this.modalSetting)
  }

  setColorTheme(color) {
    this.colorTheme = color
    this.view.setColorTheme(this.colorTheme)
  }

  completeTask() {
    this.arrayToDoTask = this.arrayToDoTask.filter(
      (item) => item.id !== this.currentClickTask.id
    )
    this.arrayComplectedTask = this.arrayComplectedTask.concat(
      this.currentClickTask
    )

    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
  }

  editTask(inputs) {
    this.modalWindowForEdit = true

    this.toggleModalWindow()

    inputs[0].value = this.currentClickTask.title
    inputs[1].value = this.currentClickTask.text
    for (const input of inputs) {
      if (input.value === this.currentClickTask.priority) input.checked = true
    }
  }

  removeTask() {
    this.arrayToDoTask = this.arrayToDoTask.filter(
      (item) => item.id !== this.currentClickTask.id
    )

    this.view.viewArrayTask(this.arrayToDoTask)
  }

  setSortUpDate() {
    this.arrayToDoTask = this.arrayToDoTask.sort((a, b) =>
      a.getDate > b.getDate ? 1 : 1
    )

    this.view.viewArrayTask(this.arrayToDoTask)
  }

  setSortDownDate() {
    this.arrayToDoTask = this.arrayToDoTask.sort((a, b) =>
      a.getDate < b.getDate ? 1 : -1
    )

    this.view.viewArrayTask(this.arrayToDoTask)
  }
}
