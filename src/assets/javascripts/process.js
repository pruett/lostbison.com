import './modules/rAF';
import utils from './modules/utils';
import imagesLoaded from 'imagesloaded';

const header = document.querySelector('[data-hook="getHeader"]');
const heroContent = document.querySelector('[data-hook="getHeroContent"]');
const bruceLee = document.querySelector('[data-hook="getBruceLee"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  imagesLoaded(bruceLee, (instance) => {
    requestAnimationFrame(() => utils.addClass(instance.images[0].img, '-anim_appear'));
    setTimeout(() => requestAnimationFrame(() => utils.addClass(heroContent, '-anim_appear')), 1000);
  });
}

setTimeout(() => requestAnimationFrame(animateElements), 500);
