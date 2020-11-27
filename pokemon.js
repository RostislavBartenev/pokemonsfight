import { $getElById } from "./utils.js";

class Selectors {
  constructor(name) {
    this.elHP = $getElById(`health-${name}`)
    this.elProgressbar = $getElById(`progressbar-${name}`)
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors, damage }) {
    super(selectors)
    this.name = name
    this.hp = {
      current: hp,
      total: hp,
    }
    this.attack = {
      0: {
        count: 6,
        damage: damage[0]
      },
      1: {
        count: 3,
        damage: damage[1]
      },
    },
    this.type = type

    this.renderHP()
  }

  changeHP = (count, cb) => {
    this.hp.current -= count

    if (this.hp.current <= 0) {
      this.hp.current = 0
    }

    this.renderHP()
    cb && cb(count)
  }



  renderHP = () => {
    this.renderHPLife()
    this.renderProgressbarHP()
  }

  renderHPLife = () => {
    const { elHP,  hp: { current, total } } = this
    elHP.innerText = current + ' / ' + total
  }


  renderProgressbarHP = () => {
    const { hp: { current, total }, elProgressbar } = this
    const percent = current / (total / 100)
    elProgressbar.style.width = percent + '%'
  }
}

export default Pokemon
