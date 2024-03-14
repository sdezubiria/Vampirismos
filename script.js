const divContainer = document.querySelector(".container");
const circleContainer = document.querySelector(".circle-container");

function getBoundingBox(element) {
  const box = element.getBoundingClientRect();
  const ret = {};

  // Loop through all DomRect properties and assign them to the return object
  for (const prop in box) {
    ret[prop] = box[prop];
  }

  // Calculate and add xCenter and yCenter properties
  ret.xCenter = (box.left + box.right) / 2;
  ret.yCenter = (box.top + box.bottom) / 2;

  return ret;
}

let angle = 0;
let radius = 350;
let animationId = null;

function updateCircles() {
  const numCircles = 5;
  const angleIncrement = (Math.PI * 2) / numCircles;

  for (let i = 1; i <= numCircles; i++) {
    const cElement = circleContainer.querySelector(`.c${i}`);
    if (cElement) {
      cElement.style.position = "absolute";
      const radians = angle + (i - 1) * angleIncrement;
      const x = getBoundingBox(divContainer).xCenter + 430 * Math.cos(radians);
      const y = getBoundingBox(divContainer).yCenter + 200 * Math.sin(radians);
      cElement.style.top = `${y}px`;
      cElement.style.left = `${x-40}px`;
    }
  }

  angle += 0.00005;
  animationId = requestAnimationFrame(updateCircles);
}

function startAnimation() {
  if (animationId === null) {
    updateCircles();
  }
}

function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

startAnimation();
