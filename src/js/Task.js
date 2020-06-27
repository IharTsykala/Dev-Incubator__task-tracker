export default class Task {
  constructor({
    id,
    title,
    text,
    priority,
    data,
    getTime,
    disabled,
    display,
    colorTask,
  }) {
    this.id = id
    this.title = title
    this.text = text
    this.priority = priority
    this.data = data || this.createData()
    this.getTime = getTime || new Date().getTime()
    this.disabled = disabled || ""
    this.display = display || "grid"
    this.colorTask = colorTask || "red"
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
  </div>`
  }

  createData() {
    let hours = new Date().getHours() + ""
    let minutes = new Date().getMinutes() + ""
    let day = new Date().getDate() + ""
    let mount = new Date().getMonth() + 1 + ""
    const year = new Date().getUTCFullYear()
    if (hours.length === 1) hours = "0" + hours
    if (minutes.length === 1) minutes = "0" + minutes
    if (day.length === 1) day = "0" + day
    if (mount.length === 1) mount = "0" + mount
    return `${hours}:${minutes} ${day}:${mount}:${year}`
  }

  setColorTask(priority) {
    switch (priority) {
      case "Low":
        return "green"
      case "Medium":
        return "yellow"
      default:
        return "red"
    }
  }

  setDisabled(disabled) {
    if (disabled) {
      this.display = "none"
      this.disabled = "disabled"
    } else {
      this.display = "grid"
      this.disabled = ""
    }
  }

  viewTask(disabled) {
    this.setDisabled(disabled)
    this.colorTask = this.setColorTask(this.priority)
    this.task = document.createElement("div")
    this.task.className = `task task${this.id} task_${this.colorTask} task_${this.disabled}`
    this.task.innerHTML = this.fillContentTask()
    return this.task
  }

  removeTask() {
    delete this.task
  }
}