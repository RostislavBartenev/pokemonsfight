import { $getElById } from "./utils.js";

class Selectors {
  constructor(name) {
    this.elHP = $getElById(`health-${name}`)
    this.elProgressbar = $getElById(`progressbar-${name}`)
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors, damage, attacks = [], img}) {
    super(selectors)
    this.name = name
    this.hp = {
      current: hp,
      total: hp,
    },
    this.type = type
    this.attacks = attacks
    this.img = img,

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

  setImg = (selector) => {
    const $elImg = $getElById(selector);
    $elImg.src = this.img;
  }

  setName = (selector) => {
    const $elName = $getElById(selector)
    $elName.innerText = this.name
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
