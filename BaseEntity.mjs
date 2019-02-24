export class BaseEntity {
  constructor({ context, id, x, y }) {
    this.c = context
    this.id = id
    this.x = x
    this.y = y
    this.destination = [x, y]
    this.speed = 1
    this.w = 20
    this.h = 20
    this.shouldDraw = true
  }

  draw() {
    if (!this.shouldDraw) {
      return
    }

    this.x = move({
      speed: this.speed,
      curr: this.x,
      dest: this.destination[0]
    })

    this.y = move({
      speed: this.speed,
      curr: this.y,
      dest: this.destination[1]
    })

    this.c.fillStyle = "black"
    this.c.fillRect(this.x, this.y, this.w, this.h)
  }

  move(x, y) {
    this.destination = [x, y]
  }
}

function move({ speed, curr, dest }) {
  const maxMoveForThisFrame = Math.min(Math.abs(curr - dest), speed)
  if (curr === dest) {
    return curr
  }
  return curr < dest ? curr + maxMoveForThisFrame : curr - maxMoveForThisFrame
}
