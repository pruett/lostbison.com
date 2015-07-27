import './modules/rAF';
import utils from './modules/utils';
import noUiSlider from './modules/nouislider.min';

const header = document.querySelector('[data-hook="getHeader"]');
const heroContent = document.querySelector('[data-hook="getHeroContent"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
}

setTimeout(() => requestAnimationFrame(animateElements), 500);

noUiSlider.create(document.querySelector('[data-hook="budgetRange"]'), {
  start: [ 10000, 20000 ],
  range: { 'min': [ 5000 ],'max': [ 50000 ] },
  step: 1000,
  margin: 2000,
  connect: true
});
