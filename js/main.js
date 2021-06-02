function randomNumber(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let number = min - 0.5 + Math.random() * (max - min + 1);
  return (number);
}

randomNumber(0.5, 1);
