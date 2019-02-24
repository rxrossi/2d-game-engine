export default function getEntityClicked({ event, entities }) {
  return entities.find(entity => {
    const hitedX =
      event.clientX >= entity.x && event.clientX <= entity.x + entity.w
    const hitedY =
      event.clientY >= entity.y && event.clientY <= entity.y + entity.h

    return hitedX && hitedY
  })
}
