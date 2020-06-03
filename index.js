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
  }

  initial () {
    this.addTaskWrapper.addEventListener('click', () => this.model.tongueModalWindow())
    this.modalWindow.addEventListener('click', () => this.model.tongueModalWindow())

    this.model.createTask()
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

  createTask () {
    this.arrayToDoTask = this.arrayToDoTask.concat(new Task(this.idTask++, 'First task', 'Hello', 'High'))
    this.view.viewArrayTask(this.arrayToDoTask)
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

  viewArrayTask (array) {
    // console.log(array)
    array.map(item => this.arrayToDoTask.append(item.viewTask()))
  }

  viewModalWindow (booleanValue) {
    if (booleanValue) this.modalWindow.style.display = 'grid'
    else this.modalWindow.style.display = ''
  }

  deleteBlocks () {
    // this.atmBlock.remove()
    // this.queue.remove()
  }
}

const wrapper = document.getElementById('wrapper')
const view = new View(wrapper)
const model = new Model(view)
const controller = new Controller(model, wrapper)

// view.start()
controller.initial()
