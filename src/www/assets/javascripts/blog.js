import './modules/rAF';
import utils from './modules/utils';

const header = document.querySelector('[data-hook="getHeader"]');
const mainContent = document.querySelector('[data-hook="getMainContent"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(mainContent, '-anim_appear'));
};

setTimeout(() => requestAnimationFrame(animateElements), 500);
