import './modules/rAF';
import utils from './modules/utils';
import noUiSlider from './modules/nouislider.min';

const header = document.querySelector('[data-hook="getHeader"]');
const mainContent = document.querySelector('[data-hook="getMainContent"]');
const budgetRange = document.querySelector('[data-hook="budgetRange"]');
const budgetFrom = document.querySelector('[data-hook="budgetFrom"]');
const budgetTo = document.querySelector('[data-hook="budgetTo"]');
const projectForm = document.querySelector('form');
const submitBtn = document.querySelector('input[type="submit"]');
const flashMsg = document.querySelector('[data-hook="getFlashMessage"]');

import serialize from 'form-serialize';
import 'whatwg-fetch';

const animateElements = function() {
  requestAnimationFrame(() => utils.addClass(header, '-anim_appear'));
  requestAnimationFrame(() => utils.addClass(mainContent, '-anim_appear'));
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

budgetRange.noUiSlider.on('update', function(values) {
  budgetFrom.innerHTML = values[0];
  budgetTo.innerHTML = values[1] === "$50,000" ? "$50,000+" : values[1];
  return false;
});

setTimeout(() => requestAnimationFrame(animateElements), 500);

let setBtnState = function({msg = 'sending...', state = 'disabled'} = {}) {
  state === 'disabled' ? submitBtn.setAttribute('disabled', 'disabled')
                       : submitBtn.removeAttribute('disabled');

  submitBtn.value = msg;
  return false;
};

let showMessage = function(res) {

  if (res.status < 300) {
    console.info('Thanks for your submission! An automated email will be sent to your inboxshortly');
    flashMsg.innerHTML = "Your submission has been sent!<br>You&rsquo;ll receive an automated email in your inbox shortly."
    requestAnimationFrame(() => utils.removeClass(flashMsg, '-error'));
    requestAnimationFrame(() => utils.addClass(flashMsg, '-anim_appear'));
    projectForm.reset();
    return;
  }

  if (res.status > 399 && res.status < 500) {
    utils.addClass(flashMsg, '-error');
    flashMsg.innerHTML = "Oh no! Please make sure all fields are filled in.";
    requestAnimationFrame(() => utils.addClass(flashMsg, '-anim_appear'));
    setBtnState({ msg: 'Submit', state: 'on' });
  } else {
    utils.addClass(flashMsg, 'error');
    flashMsg.innerHTML = "Whoops! There seems to be a server error.<br>Please contact us if the problem persists.";
    requestAnimationFrame(() => utils.addClass(flashMsg, '-anim_appear'));
    setBtnState({ msg: 'Submit', state: 'on' });
  }
};

let checkStatus = function(res) {
  if (res.status < 300) {
    return res;
  } else {
    let error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
};

let postProposal = function(data) {
  fetch('http://lostbison.herokuapp.com/proposal', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then((res) => showMessage(res))
    .then(() => setBtnState({ msg: 'sent!' }))
    .catch(function(error) {
      showMessage(error.response)
    })
};

let submitProject = function(e) {
  e.preventDefault();
  let formValues = serialize(projectForm, { hash: true });
  formValues.budget = budgetRange.noUiSlider.get();

  utils.removeClass(flashMsg, '-anim_appear');
  setBtnState();
  postProposal(formValues);

  return false;
}

projectForm.addEventListener('submit', submitProject, false);
