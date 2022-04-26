const numbers = [];
const length = 5;
const container = document.querySelector('.container');

for (i=0; i<length; i++) {
   numbers[i] = generateRandomNumber(0, 9);
 }

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

 for (i=0; i<length; i++) {
  const span = document.getElementById(`number${i+1}`);
  span.append(numbers[i]);
 }

 