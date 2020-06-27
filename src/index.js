import "./style.scss"
import Controller from "./js/controller"
import Model from "./js/model"
import View from './js/view'

const wrapper = document.getElementById("wrapper")
const view = new View(wrapper)
const model = new Model(view)
const controller = new Controller(model, wrapper)

view.initial()
controller.initial()
