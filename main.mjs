import Shooters from "./Shooters.mjs"
import getEntityClicked from "./getEntityClicked.mjs"

const canvas = document.querySelector("canvas")
canvas.width = 900
canvas.height = 900
const selectedEntityDisplay = document.querySelector(
  "[data-name='selected-entity']"
)

let selectedEntity

const context = canvas.getContext("2d")

let entities = [
  new Shooters({
    context,
    id: "Robot1",
    x: 0,
    y: 0
  }),
  new Shooters({
    context,
    id: "Robot2",
    x: 50,
    y: 50
  })
]

window.addEventListener("contextmenu", event => {
  event.preventDefault()
  selectedEntity = null
  selectedEntityDisplay.textContent = selectedEntity && selectedEntity.id
})

window.addEventListener("click", event => {
  const clickEvent = {
    entity: getEntityClicked({ entities, event })
  }
  // if clickEvent.entity is a target
  if (selectedEntity && clickEvent.entity)
    return selectedEntity.attack(clickEvent.entity)

  // change Selected entity
  selectedEntity = clickEvent.entity || selectedEntity
  selectedEntityDisplay.textContent = selectedEntity && selectedEntity.id

  // Move if click was not on a entity
  if (selectedEntity && !clickEvent.entity) {
    selectedEntity.move(event.clientX, event.clientY)
  }
})

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, innerWidth, innerHeight)

  entities.forEach(entity => {
    entity.draw()
  })
}

animate()
