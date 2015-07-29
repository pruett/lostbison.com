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

setTimeout(() => requestAnimationFrame(animateElements), 500);

budgetRange.noUiSlider.on('update', function(values) {
  budgetFrom.innerText = values[0];
  budgetTo.innerText = values[1] === "$50,000" ? "$50,000+" : values[1];
  return false;
});

let toggleBtnState = function(state = 'disable') {
  if (state === 'disable') {
    submitBtn.setAttribute('disabled', 'disabled');
    submitBtn.value = "Sending...";
  } else {
    submitBtn.removeAttribute('disabled');
    submitBtn.value = "Let&rsquo;s build this thing!";
  }
  return false;
};


let checkStatus = function(res) {
  if (res.status >= 299 && res.status < 300) {
    return res;
  } else {
    let error = new Error(res.status);
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
    .then(() => toggleBtnState('on'))
    .catch(function(error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        console.log('fill in fields');
      } else {
        console.log('server error');
      }
    })
};

let submitProject = function(e) {
  e.preventDefault();
  let formValues = serialize(projectForm, { hash: true });
  formValues.budget = budgetRange.noUiSlider.get();

  toggleBtnState();
  postProposal(formValues);

  return false;
}

projectForm.addEventListener('submit', submitProject, false);
