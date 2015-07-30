import './modules/rAF';
import utils from './modules/utils';
import imagesLoaded from 'imagesloaded';

const header = document.querySelector('[data-hook="getHeader"]');
const teamContent = document.querySelector('[data-hook="getTeamContent"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(teamContent, '-anim_appear'));
  imagesLoaded(teamContent, (instance) => {
    instance.images.forEach((image) => {
      requestAnimationFrame(() => utils.addClass(image.img, '-anim_appear'));
    });
  });
}

setTimeout(() => requestAnimationFrame(animateElements), 500);
