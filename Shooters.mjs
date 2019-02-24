import { BaseEntity } from "./BaseEntity.mjs"

function getDistance(currPos, targetPos) {
  const y = currPos.y - targetPos.y
  const x = currPos.x - targetPos.x
  return Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2))
}

function getPosToShoot(distance, targetPos) {
  const x = targetPos.x - distance / 2
  const y = targetPos.y - distance / 2
  return {
    x,
    y
  }
}

export default class Shooter extends BaseEntity {
  maxHealth = 300
  health = 300
  damage = 100
  attackRange = 100

  takeDamage(damage) {
    this.health = this.health - damage
    if (this.health <= 0) {
      this.shouldDraw = false
    }
  }

  attack(target) {
    if (target.id !== this.id) {
      const distance = getDistance(this, target)
      console.log(distance)

      if (distance <= this.attackRange) {
        target.takeDamage(this.damage)
      } else {
        const { x, y } = getPosToShoot(this.attackRange, target)
        console.log(x, y)
        this.move(x, y)
      }
    }
  }

  draw() {
    super.draw()
    const healthBarW = (this.w / this.maxHealth) * this.health
    this.c.fillStyle = "red"
    this.c.fillRect(this.x, this.y, healthBarW, 5)
  }
}
