class Task {
  constructor (id, title, text, priority, data) {
    this.id = id
    this.title = title
    this.text = text
    this.priority = priority
    this.data = data || this.createData()
    this.getTime = new Date().getTime()
    this.disabled = ''
    this.display = 'grid'
  }
  // new Date().toString().slice(0, 25)

  fillContentTask (task) {
    return (
  `<div class="task__information-block">
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
  </div>`)
  }

  createData () {
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    let day = new Date().getDate() + ''
    let mount = new Date().getMonth() + 1 + ''
    const year = new Date().getUTCFullYear()
    if (day.length === 1) day = '0' + day
    if (mount.length === 1) mount = '0' + mount
    return `${hours}:${minutes} ${day}:${mount}:${year}`
  }

  viewTask (disabled) {
    if (disabled) {
      this.display = 'none'
      this.disabled = 'disabled'
    } else {
      this.display = 'grid'
      this.disabled = ''
    }
    this.task = document.createElement('div')
    this.task.className = `task task${this.id} task_${this.disabled}`
    this.task.innerHTML = this.fillContentTask()
    return this.task
  }

  removeTask () {
    delete this.task
  }
}

class Controller {
  constructor (model, wrapper) {
    this.model = model
    this.wrapper = wrapper
    this.addTaskWrapper = wrapper.querySelector('.add-task-wrapper')
    this.modalWindow = wrapper.querySelector('.modal-window')
    this.addTask = wrapper.querySelector('.add-task')
    this.addTaskHederClose = wrapper.querySelector('.add-task__header-close-button')
    this.close = wrapper.querySelector('.close')
    this.addTaskTongue = wrapper.querySelector('.add-task-tongue')
    this.toDoArray = wrapper.querySelector('.todo-section__array')
    this.sortUpButton = wrapper.querySelector('.sort__button_up')
    this.sortDownButton = wrapper.querySelector('.sort__button_down')
  }

  initial () {
    // modal window
    this.addTaskWrapper.addEventListener('click', () => this.model.tongueModalWindow())
    this.modalWindow.addEventListener('click', () => this.model.tongueModalWindow())
    this.addTask.addEventListener('click', (e) => e.stopPropagation())
    this.addTaskHederClose.addEventListener('click', () => this.model.tongueModalWindow())
    // Modal window add task or Edit
    this.close.addEventListener('click', () => this.model.tongueModalWindow())
    this.addTaskTongue.addEventListener('click', (e) => this.handlerAddTaskTongue(e))
    // close modal for button in the task
    this.wrapper.addEventListener('click', (e) => this.model.tongueTaskModal('wrapper', e))
    // click on task with handler jn parent
    this.toDoArray.addEventListener('click', (e) => this.handleClickTask(e))
    // sort
    this.sortUpButton.addEventListener('click', () => this.model.setSortUpDate())
    this.sortDownButton.addEventListener('click', () => this.model.setSortUpDate())

    // this.model.createTask()
  }

  handlerAddTaskTongue (e) {
    e.preventDefault()
    const inputs = this.addTask.querySelectorAll('input')
    if (inputs[0].value && inputs[1].value) {
      this.model.createTask(inputs)
      this.model.tongueModalWindow()
      inputs[0].value = ''
      inputs[1].value = ''
    }
  }

  handleClickTask (e) {
    if (e.target.className === 'task__button') {
      this.model.setCurrentClickTask(e.target.id)
      this.model.tongueTaskModal('task__button', e)
    } else if (e.target.classList[1] === 'task__modal-option_complete_green') {
      this.model.completeTask()
    } else if (e.target.classList[1] === 'task__modal-option_edit_turquoise') {
      this.model.editTask(this.addTask.querySelectorAll('input'))
    } else if (e.target.classList[1] === 'task__modal-option_delete_red') {
      this.model.removeTask()
    }
  }
}
class Model {
  constructor (view) {
    this.view = view
    this.arrayToDoTask = []
    this.arrayComplectedTask = []
    this.idTask = 1
    this.modalWindow = false
    this.modalWindowForEdit = false
    this.taskModal = false
    this.currentClickTask = null
  }

  createTask (inputs) {
    if (inputs && inputs[0].value && inputs[1].value) {
      const priority = Array.from(inputs).find(item => item.checked)
      // Edit exist task
      if (this.modalWindowForEdit) {
        this.currentClickTask.title = inputs[0].value
        this.currentClickTask.text = inputs[1].value
        this.currentClickTask.priority = priority.value
      } else {
        // add new task
        const newTask = new Task(this.idTask++, inputs[0].value, inputs[1].value, priority.value)
        this.arrayToDoTask = this.arrayToDoTask.concat(newTask)
      }
      this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
    }
    this.modalWindowForEdit = false
  }

  tongueModalWindow () {
    this.modalWindow = !this.modalWindow
    this.view.viewModalWindow(this.modalWindow)
  }

  setCurrentClickTask (id) {
    this.currentClickTask = this.arrayToDoTask.find(item => item.id === id)
  }

  tongueTaskModal (areaClick, e) {
    // click only button
    if (areaClick === 'task__button') {
      e.stopPropagation()
      this.taskModal = !this.taskModal
      this.view.viewTaskModal(this.taskModal)
      // click on wrapper, but not button
    } else if (areaClick === 'wrapper' && this.taskModal) {
      this.taskModal = false
      this.view.viewTaskModal(this.taskModal)
    }
  }

  completeTask () {
    this.arrayToDoTask = this.arrayToDoTask.filter(item => item.id !== this.currentClickTask.id)
    this.arrayComplectedTask = this.arrayComplectedTask.concat(this.currentClickTask)

    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
  }

  editTask (inputs) {
    this.modalWindowForEdit = true

    this.tongueModalWindow()

    inputs[0].value = this.currentClickTask.title
    inputs[1].value = this.currentClickTask.text
    for (const input of inputs) {
      if (input.value === this.currentClickTask.priority) input.checked = true
    }
  }

  removeTask () {
    this.arrayToDoTask = this.arrayToDoTask.filter(item => item.id !== this.currentClickTask.id)

    this.view.viewArrayTask(this.arrayToDoTask)
  }

  setSortUpDate () {
    console.log(1)
    this.arrayToDoTask = this.arrayToDoTask.sort((a, b) => a.getDate > b.getDate ? 1 : -1)

    this.view.viewArrayTask(this.arrayToDoTask)
  }

  setSortDownDate () {
    this.arrayToDoTask = this.arrayToDoTask.sort((a, b) => a.getDate < b.getDate ? 1 : -1)

    this.view.viewArrayTask(this.arrayToDoTask)
  }
}

class View {
  constructor (wrapper) {
    this.wrapper = wrapper
    this.arrayToDoTask = wrapper.querySelector('.todo-section__array')
    this.arrayComplectedTask = wrapper.querySelector('.complected-section__array')
    this.modalWindow = wrapper.querySelector('.modal-window')
  }

  viewArrayTask (arrayToDo, arrayComplected) {
    // clear DOM
    while (this.arrayToDoTask.children.length) {
      this.arrayToDoTask.children[0].remove()
    }
    // render arrays in DOM
    arrayToDo.forEach(item => this.arrayToDoTask.append(item.viewTask()))
    // same if task completed
    if (arrayComplected) {
      while (this.arrayComplectedTask.children.length) {
        this.arrayComplectedTask.children[0].remove()
      }
      arrayComplected.map(item => this.arrayComplectedTask.append(item.viewTask(true)))
    }
    // taskModel had created
    this.taskModal = this.wrapper.querySelector('.task__modal')
  }

  viewModalWindow (booleanValue) {
    if (booleanValue) this.modalWindow.style.display = 'grid'
    else this.modalWindow.style.display = ''
  }

  viewTaskModal (booleanValue) {
    if (this.taskModal) {
      if (booleanValue) this.taskModal.style.display = 'grid'
      else this.taskModal.style.display = ''
    }
  }
}

const wrapper = document.getElementById('wrapper')
const view = new View(wrapper)
const model = new Model(view)
const controller = new Controller(model, wrapper)

controller.initial()
