const $getElById = (id) => document.getElementById(id)

const $controlButtons = document.querySelectorAll('button')

const character = {
  name: 'Pikachu',
  type: 'electric',
  weakness: ['fire', 'water'],
  resistance: ['steel'],
  hp: {
    current: 100,
    total: 100,
  },
  attack: [20, 50],
  elHP: $getElById('health-character'),
  elProgressbar: $getElById('progressbar-character'),
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP
}

const enemy = {
  name: 'Charmander',
  type: 'fire',
  weakness: ['water'],
  resistance: ['electric'],
  hp: {
    current: 100,
    total: 100,
  },
  attack: [30, 40],
  elHP: $getElById('health-enemy'),
  elProgressbar: $getElById('progressbar-enemy'),
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP
}

const random = (num) => {
  return Math.ceil(Math.random() * num)
}

function renderHPLife() {
  this.elHP.innerText = this.hp.current + ' / ' + this.hp.total
}


function renderProgressbarHP() {
  this.elProgressbar.style.width = this.hp.current + '%'
}

function renderHP() {
  this.renderHPLife()
  this.renderProgressbarHP()
}

function changeHP(count) {
  this.hp.current -= count

  const log = enemy ? generateLog(this, character, count) : generateLog(this, enemy, count)

  const logText = `<p>${log}</p>`
  $getElById('logs').insertAdjacentHTML('afterbegin', logText)
  console.log(logText)

  if (this.hp.current <= 0) {
    this.hp.current = 0
    alert('Бедный ' + this.name + ' проиграл бой!')
    for (let i = 0; i < $controlButtons.length; i++) {
      $controlButtons[i].disabled = true
    }
  }

  this.renderHP()
}


for (let i = 0; i < $controlButtons.length; i++) {
  $controlButtons[i].addEventListener('click', () => {
    enemy.changeHP(random(character.attack[i]))
  })
}

function init() {
  character.renderHP()
  enemy.renderHP()
}

  function generateLog({name, hp}, {name: enemyName}, damage) {
  const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${enemyName} , не помня себя от испуга, ударил в предплечье врага.`,
    `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага.`,
    `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар.`,
    `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар.`,
    `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар.`,
    `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника`,
    `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника.`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику.`
  ];

  return logs[random(logs.length) - 1] + ` -${damage} [${hp.current <= 0 ? '0' : hp.current} / ${hp.total}]`
}

init()
