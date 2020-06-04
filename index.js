class Task {
  constructor (id, title, text, priority) {
    this.id = id
    this.title = title
    this.text = text
    this.priority = priority
    this.data = new Date().toString().slice(0, 25)
    this.disabled = ''
  }

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
    <button id=${this.id} class="task__button" ${this.disabled}>
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>`)
  }

  viewTask (disabled) {
    if (disabled) this.disabled = 'disabled'
    else this.disabled = ''
    this.task = document.createElement('div')
    this.task.className = `task task${this.id}`
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
  }

  initial () {
    this.addTaskWrapper.addEventListener('click', () => this.model.tongueModalWindow())
    this.modalWindow.addEventListener('click', () => this.model.tongueModalWindow())
    this.addTask.addEventListener('click', (e) => e.stopPropagation())
    this.addTaskHederClose.addEventListener('click', () => this.model.tongueModalWindow())
    this.close.addEventListener('click', () => this.model.tongueModalWindow())

    this.addTaskTongue.addEventListener('click', (e) => this.handlerAddTaskTongue(e))

    this.wrapper.addEventListener('click', (e) => this.model.tongueTaskModal('wrapper', e))

    this.toDoArray.addEventListener('click', (e) => this.handleClickTask(e))

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
      this.model.setIdCurrentClickTask(e.target.id)
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
    this.idCurrentClickTask = null
  }

  createTask (inputs) {
    if (inputs && inputs[0].value && inputs[1].value) {
      const priority = Array.from(inputs).find(item => item.checked)
      const newTask = new Task(this.idTask++, inputs[0].value, inputs[1].value, priority.value)
      this.arrayToDoTask = this.arrayToDoTask.concat(newTask)

      this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
    }
  }

  tongueModalWindow () {
    this.modalWindow = !this.modalWindow
    this.view.viewModalWindow(this.modalWindow)
  }

  setIdCurrentClickTask (id) {
    this.idCurrentClickTask = +id
  }

  tongueTaskModal (areaClick, e) {
    if (areaClick === 'task__button') {
      e.stopPropagation()
      this.taskModal = !this.taskModal
      this.view.viewTaskModal(this.taskModal)
    } else if (areaClick === 'wrapper' && this.taskModal) {
      this.taskModal = false
      this.view.viewTaskModal(this.taskModal)
    }
  }

  findAmdFilterTasks () {
    const task = this.arrayToDoTask.find(item => item.id === this.idCurrentClickTask)
    this.arrayToDoTask = this.arrayToDoTask.filter(item => item.id !== this.idCurrentClickTask)
    return task
  }

  completeTask () {
    const currentTask = this.findAmdFilterTasks()

    this.arrayComplectedTask = this.arrayComplectedTask.concat(currentTask)
    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
  }

  editTask (inputs) {
    const currentTask = this.findAmdFilterTasks()

    this.tongueModalWindow()
    inputs[0].value = currentTask.title
    inputs[1].value = currentTask.text
    for (const input of inputs) {
      if (input.value === currentTask.priority) input.checked = true
    }
  }

  removeTask () {
    this.findAmdFilterTasks()

    this.view.viewArrayTask(this.arrayToDoTask, this.arrayComplectedTask)
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
    console.log(arrayToDo, arrayComplected)
    while (this.arrayToDoTask.children.length) {
      this.arrayToDoTask.children[0].remove()
    }
    while (this.arrayComplectedTask.children.length) {
      this.arrayComplectedTask.children[0].remove()
    }
    arrayToDo.forEach(item => this.arrayToDoTask.append(item.viewTask()))
    arrayComplected.map(item => this.arrayComplectedTask.append(item.viewTask(true)))

    this.taskModal = this.wrapper.querySelector('.task__modal')
  }

  viewModalWindow (booleanValue) {
    console.log(this.modalWindow)
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
