const $controlButtons = document.querySelectorAll('button')

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  attack: [20, 80]
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
}

const random = (num) => {
  return Math.ceil(Math.random() * num)
}

const renderHPLife = (person) => person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP

const renderProgressbarHP = (person) => {
  person.elProgressbar.style.width = person.damageHP + '%'
}

const renderHP = (person) => {
  renderHPLife(person)
  renderProgressbarHP(person)
}

const changeHP = (count, person) => {
  if (person.damageHP <= count) {
    person.damageHP = 0
    alert('Бедный ' + person.name + ' проиграл бой!')
    for (let i = 0; i < $controlButtons.length; i++) {
      $controlButtons[i].disabled = true
    }
  } else {
    person.damageHP -= count
  }

  renderHP(person)
}

for (let i = 0; i < $controlButtons.length; i++) {
  $controlButtons[i].addEventListener('click', () => {
    changeHP(random(character.attack[i]), enemy)
  })
}



const init = () => {
  console.log('Start Game')
  renderHP(character)
  renderHP(enemy)
}

init()
