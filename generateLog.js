import {random} from "./utils.js";

export default function generateLog({ name: characterName, hp }, { name: enemyName }, damage) {

  const logs = [
    `${characterName} вспомнил что-то важное, но неожиданно ${enemyName} , не помня себя от испуга, ударил в предплечье врага.`,
    `${characterName} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага.`,
    `${characterName} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${characterName} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар.`,
    `${characterName} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${characterName} удивился, а ${enemyName} пошатнувшись влепил подлый удар.`,
    `${characterName} высморкался, но неожиданно ${enemyName} провел дробящий удар.`,
    `${characterName} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника`,
    `${characterName} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника.`,
    `${characterName} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику.`
  ];

  return logs[random(logs.length) - 1] + ` -${damage} [${hp.current <= 0 ? '0' : hp.current} / ${hp.total}]`
}
