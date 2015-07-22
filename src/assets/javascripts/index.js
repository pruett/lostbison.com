import './modules/rAF'
import utils from './modules/utils'

const hero = document.querySelector('.HeroSection > .ContentWrapper');

const animateElements = function() {
  console.log('animate in elements on index page');
  requestAnimationFrame(() => utils.addClass(hero, 'appear'));
}

setTimeout(() => requestAnimationFrame(animateElements), 1500);
