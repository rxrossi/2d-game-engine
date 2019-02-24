import { BaseEntity } from "./BaseEntity.mjs"

export default class Shooter extends BaseEntity {
  maxHealth = 300
  health = 300
  damage = 100

  takeDamage(damage) {
    this.health = this.health - damage
    if (this.health <= 0) {
      this.shouldDraw = false
    }
  }

  attack(target) {
    target.takeDamage(this.damage)
  }

  draw() {
    console.log("aaa")
    super.draw()
    const healthBarW = (this.w / this.maxHealth) * this.health
    this.c.fillStyle = "red"
    this.c.fillRect(this.x, this.y, healthBarW, 5)
  }
}
