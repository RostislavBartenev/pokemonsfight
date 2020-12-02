import Pokemon from "./pokemon.js";
import {$getElById, random} from "./utils.js";
import generateLog from "./generateLog.js";


class Game {
  getPokemons = async () => {
    const req = await fetch('https://reactmarathon-api.netlify.app/api/pokemons')
    const res = req.json()

    return res
  }

  start = async () => {
    const pokemons = await this.getPokemons()

    const p1 = new Pokemon({
      ...pokemons[random(pokemons.length - 1)],
      selectors: 'player1',
    })


    const p2 = new Pokemon({
      ...pokemons[random(pokemons.length - 1)],
      selectors: 'player2',
    })

    p1.setImg('img-player1')
    p2.setImg('img-player2')
    p1.setName('name-player1')
    p2.setName('name-player2')


    p1.renderHP()
    p2.renderHP()

    const $control = document.querySelector('.control')

    p1.attacks.forEach(item => {
      const $btn = document.createElement('button')
      $btn.classList.add('button')
      $btn.innerText = item.name
      const btnCount = countBtn(item.maxCount, $btn)
      $btn.addEventListener('click', () => {
        btnCount()
        console.log(item.id)

         async function getFight() {
          const req = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${p1.id}&attackId=${item.id}&player2id=${p2.id}`)
          const res = await req.json()

           p2.changeHP(res['kick']['player2'], logs(res['kick']['player2'], p1))
           p1.changeHP(res['kick']['player1'], logs(res['kick']['player1'], p2))

        }

        getFight()

      })
      $control.appendChild($btn)
    })

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

    const $controlButtons = document.querySelectorAll('button')

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
        if (p1.hp.current - count <= 0 || p2.hp.current - count <= 0) resetGame()
      }

    }
  }

}

const game = new Game()

game.start()


const resetGame = () => {
  const allButtons = document.querySelectorAll('.control .button');
  allButtons.forEach($item => $item.remove());

  game.start()
}


