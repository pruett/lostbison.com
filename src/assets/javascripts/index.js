import './modules/rAF'
import utils from './modules/utils'

const header = document.querySelector('[data-hook="getHeader"]');
const heroContent = document.querySelector('[data-hook="getHeroContent"]');
const bulletPoints = document.querySelector('[data-hook="getBulletPoints"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(heroContent, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(bulletPoints, '-anim_appear'));
}

setTimeout(() => requestAnimationFrame(animateElements), 500);
