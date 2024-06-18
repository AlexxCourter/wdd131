// const PI = 3.14;
// let radius = 3;
// let area = 0;
// area = radius * radius * PI;

// console.log(`area: ${area}`)

// radius = 4;
// area = radius * radius * PI;

// console.log(`area: ${area}`)

const PI = 3.14;
let radius = 4;
let area = 0;
function circleArea(radius) {
  return radius * PI;
}
area = circleArea(3);
console.log(area);