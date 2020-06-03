class Task {
  constructor (id, title, text, priority) {
    this.id = id
    this.title = title
    this.text = text
    this.priority = priority
    this.data = new Date().toString().slice(0, 15)
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
    <button class="task__button">***</button>
  </div>`)
  }

  viewTask () {
    this.task = document.createElement('div')
    this.task.className = `task task${this.id}`
    this.task.innerHTML = this.fillContentTask()
    return this.task
  }
}

class Controller {
  constructor (model, wrapper) {
    this.model = model
    this.addTaskWrapper = wrapper.querySelector('.add-task-wrapper')
    this.modalWindow = wrapper.querySelector('.modal-window')
    this.addTask = wrapper.querySelector('.add-task')
    this.addTaskHederClose = wrapper.querySelector('.add-task__header-close-button')
    this.close = wrapper.querySelector('.close')
    this.addTaskTongue = wrapper.querySelector('.add-task-tongue')
  }

  initial () {
    this.addTaskWrapper.addEventListener('click', () => this.model.tongueModalWindow())
    this.modalWindow.addEventListener('click', () => this.model.tongueModalWindow())
    this.addTask.addEventListener('click', (e) => e.stopPropagation())
    this.addTaskHederClose.addEventListener('click', () => this.model.tongueModalWindow())
    this.close.addEventListener('click', () => this.model.tongueModalWindow())

    this.addTaskTongue.addEventListener('click', (e) => this.handlerAddTaskTongue(e))

    this.model.createTask()
  }

  handlerAddTaskTongue (e) {
    e.preventDefault()
    const inputs = this.addTask.querySelectorAll('input')
    if (inputs[0].value && inputs[1].value) this.model.createTask(inputs)
    this.model.tongueModalWindow()
    inputs[0].value = ''
    inputs[1].value = ''
  }
}
class Model {
  constructor (view) {
    this.view = view
    this.arrayToDoTask = []
    this.arrayComplectedTask = []
    this.idTask = 0
    this.modalWindow = false
  }

  createTask (inputs) {
    let newTask
    if (inputs && inputs[0].value && inputs[1].value) {
      newTask = new Task(this.idTask++, inputs[0].value, inputs[1].value, 'High')
      this.arrayToDoTask = this.arrayToDoTask.concat(newTask)
    }
    //  else this.arrayToDoTask = this.arrayToDoTask.concat(new Task(this.idTask++, 'First task', 'Hello', 'High'))
    console.log(this.arrayToDoTask)
    this.view.viewArrayTask(newTask)
  }

  tongueModalWindow () {
    this.modalWindow = !this.modalWindow
    this.view.viewModalWindow(this.modalWindow)
  }
}

class View {
  constructor (wrapper) {
    this.wrapper = wrapper
    this.arrayToDoTask = wrapper.querySelector('.todo-section__array')
    this.modalWindow = wrapper.querySelector('.modal-window')
  }

  viewArrayTask (newTask) {
    // console.log(this.arrayToDoTask.children[0])
    if (newTask) this.arrayToDoTask.append(newTask.viewTask())
  }

  viewModalWindow (booleanValue) {
    if (booleanValue) this.modalWindow.style.display = 'grid'
    else this.modalWindow.style.display = ''
  }
}

const wrapper = document.getElementById('wrapper')
const view = new View(wrapper)
const model = new Model(view)
const controller = new Controller(model, wrapper)

// view.start()
controller.initial()
