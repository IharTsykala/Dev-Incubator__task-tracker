class Task {
  constructor (id, title, text, priority) {
    this.id = id
    this.title = title
    this.text = text
    this.priority = `${priority} priority`
    this.data = new Date().toString().slice(0, 15)
  }

  contentTask (task) {
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
    this.task.innerHTML = this.contentTask
    return this.task
  }
}

class Controller {
  constructor (model, wrapper) {
    this.wrapper = wrapper
    this.model = model
  }

  initial () {
    // this.buttonStart = wrapper.querySelector('.start')
    // this.buttonStart.addEventListener('click', () => this.startQueue())
    this.
  }
}
class Model {
  constructor (view) {
    this.view = view
    this.queue = []
    this.idPerson = 1
    this.amountATM = 3
    this.arrATM = []
    this.numberATM = 1
  }

  createATM () {
    for (let i = 0; i < this.amountATM; i++) {
      // this.arrATM = this.arrATM.concat([new ModelATM(this.numberATM++)])
    }
    // this.view.createFirstATM(this.arrATM)
  }

  createPerson () {
    // const person = new Person(this.idPerson)
    // this.queue = this.queue.concat(person)
    // this.view.addPersonView(person)
    // this.idPerson++

  }

  checkFreeBase (currentServeATM) {

  }

  stopQueue () {

  }

  plusATM () {
    // this.arrATM = this.arrATM.concat([new ModelATM(this.numberATM++)])

  }

  minusATM () {

  }

  clearModel () {
    console.log(this)
    this.queue = []
    this.idPerson = 1
    this.amountATM = 3
    this.arrATM = []
    this.numberATM = 1
  }
}

class View {
  constructor (wrapper) {
    this.wrapper = wrapper
  }

  start () {

  }

  createBlockATM () {

  }

  createBlockQueue () {

  }

  createFirstATM (arrATM) {
    if (!this.atmBlock.children.length) {
      arrATM.forEach(() => {
        this.createATM()
      })
    }
  }

  createATM () {

  }

  addPersonView (newPerson) {
    this.queue.append(newPerson.viewPerson())
  }

  goToATM (person, currentServeATM) {

  }

  deleteBlocks () {
    this.atmBlock.remove()
    this.queue.remove()
  }

  deletePersonView () {

  }

  plusATM () {

  }

  minusATM () {

  }
}

const wrapper = document.getElementById('wrapper')
const view = new View(wrapper)
const model = new Model(view)
const controller = new Controller(model, wrapper)

view.start()
controller.initial()
