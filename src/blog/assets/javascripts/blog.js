import './modules/rAF'
import utils from './modules/utils'

const header = document.querySelector('[data-hook="getHeader"]');
const content = document.querySelector('[data-hook="getContent"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(content, '-anim_appear'));
}

setTimeout(() => requestAnimationFrame(animateElements), 500);
