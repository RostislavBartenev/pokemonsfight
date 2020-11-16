const firstRow = 'мама мыла рану';
const secondRow = 'собака друг человека';

function getLetters(string) {
  let letterCount = 0;
  for (let i = 0; i <= string.length; i++) {
    string[i] === 'а' ? letterCount += 1 : ''
  }
  return letterCount
}

function getRow(firstRow, secondRow) {
  return getLetters(firstRow) - getLetters(secondRow) > 0 ? firstRow : secondRow
}

console.log(getRow(firstRow, secondRow)); // мама мыла раму

function formattedPhone(phone) {
  if (phone.length !== 12) return undefined
  for (let i = 0; i <= phone.length; i++) {
    switch (i) {
      case 2:

        break
    }
  }
  console.log(arr)
}

console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90
