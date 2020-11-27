import Pokemon from './pokemon.js'
import { random } from "./utils.js";
import { $getElById } from "./utils.js";
import generateLog from "./generateLog.js";

const p1 = new Pokemon({
  name: 'Pikachu',
  hp: 500,
  type: 'electric',
  selectors: 'character',
  damage: [30, 1000]
})


const p2 = new Pokemon({
  name: 'Charmander',
  hp: 500,
  type: 'fire',
  selectors: 'enemy',
  damage: [20, 70]
})


const $controlButtons = document.querySelectorAll('button')




const btnCountJolt = countBtn(10, $controlButtons[0])
const btnElectroBall = countBtn(10, $controlButtons[1])

function countBtn(count = 6, el) {

  const innerText =  el.innerText
  el.innerText = `${innerText} [${count}]`

  return function () {
    count--
    if (count === 0) {
      el.disabled = true
    }
    el.innerText = `${innerText} [${count}]`
    return count
  }
}


for (let i = 0; i < $controlButtons.length; i++) {
  $controlButtons[i].addEventListener('click', () => {

    switch (i){
      case 0:
        btnCountJolt()
      break;
      case 1:
        btnElectroBall()
      break;
      default:
        console.log('error')
    }

    const enemyAttack = random(p2.attack[i].damage)
    const playerAttack = random(p1.attack[i].damage)

    p1.changeHP(enemyAttack, logs(enemyAttack, p1))
    p2.changeHP(playerAttack, logs(enemyAttack, p2))

  })
}

function logs(count, char) {

  const log = char === p2 ? generateLog(p2, p1, count) : generateLog(p1, p2, count)

  const logText = `<p>${log}</p>`
  $getElById('logs').insertAdjacentHTML('afterbegin', logText)

  if (char.hp.current <= 0) {
    char.hp.current = 0
    alert('Бедный ' + char.name + ' проиграл бой!')
    for (let i = 0; i < $controlButtons.length; i++) {
      $controlButtons[i].disabled = true
    }
  }

}
