// Задача №1
"use strict";
function solveEquation(a, b, c) {
  let arr = [];
  let d = Math.pow(b, 2) - 4 * a * c;
  if (d === 0) {
    let uniqueRoot = -b / (2 * a);
    arr = [uniqueRoot];
  }
  if (d > 0 ) {
    let firtRoot = (-b + Math.sqrt(d)) / (2 * a);
    let secondRoot = (-b - Math.sqrt(d)) / (2 * a);
    arr = [firtRoot, secondRoot];
  }
  return arr;
}

// Задача №2
function calculateTotalMortgage(percent, contribution, amount, date) {
  let message;
  if (Number.isNaN(parseInt(percent)) || percent < 0 || percent > 100) {
    message = `Параметр "Процентная ставка" содержит неправильное значение "${percent}"`;
    console.log(message);
    return message;
  }
  if (Number.isNaN(parseInt(contribution)) || contribution < 0 || contribution > amount) {
    message = `Параметр "Начальный взнос" содержит неправильное значение "${contribution}"`;
    console.log(message);
    return message;
  }
  if (Number.isNaN(parseInt(amount)) || amount < 0) {
    message = `Параметр "Общая стоимость" содержит неправильное значение "${amount}"`;
    console.log(message);
    return message;
  }
  date = String(date);
  let end = new Date(date);
  let today = new Date();
  if (Number.isNaN(Date.parse(date)) || end < today) {
    message = `Параметр "Срок" содержит неправильное значение "${date}"`;
    console.log(message);
    return message;
  }
  let difference = amount - contribution;
  let monthNumber = Math.floor((end - today)/(1000 * 60 * 60 * 24 * 30));
  let rate = (percent / 100 ) / 12;
  let payment = difference * (rate + (rate / ((Math.pow((1 + rate), monthNumber)) - 1)));
  let totalAmount = Number((payment * monthNumber).toFixed(2));
  console.log(totalAmount);
  return totalAmount;
}