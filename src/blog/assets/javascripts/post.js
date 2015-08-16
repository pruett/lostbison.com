import './modules/rAF'
import utils from './modules/utils'

const header = document.querySelector('[data-hook="getHeader"]');
const blogTitle = document.querySelector('[data-hook="getBlogTitle"]');
const blogPost = document.querySelector('[data-hook="getBlogPost"]');

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(blogTitle, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(blogPost, '-anim_appear'));
}

setTimeout(() => requestAnimationFrame(animateElements), 500);
