import './modules/rAF';
import utils from './modules/utils';
import noUiSlider from './modules/nouislider.min';

const header = document.querySelector('[data-hook="getHeader"]');
const heroContent = document.querySelector('[data-hook="getHeroContent"]');
const budgetRange = document.querySelector('[data-hook="budgetRange"]');
const budgetFrom = document.querySelector('[data-hook="budgetFrom"]');
const budgetTo = document.querySelector('[data-hook="budgetTo"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
}

noUiSlider.create(budgetRange, {
  start: [ 10000, 20000 ],
  margin: 5000,
  range: {
    'min': 5000,
    'max': 50000
  },
  step: 1000,
  connect: true,
  format: {
    to: function(value) {
      return '$' + value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    from: Number
  }
});

setTimeout(() => requestAnimationFrame(animateElements), 500);

budgetRange.noUiSlider.on('update', function(values) {
  budgetFrom.innerText = values[0];
  budgetTo.innerText = values[1] === "$50,000" ? "$50,000+" : values[1];
  return false;
});
