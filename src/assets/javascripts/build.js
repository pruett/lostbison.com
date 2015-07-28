import './modules/rAF';
import utils from './modules/utils';
import noUiSlider from './modules/nouislider.min';

const header = document.querySelector('[data-hook="getHeader"]');
const mainContent = document.querySelector('[data-hook="getMainContent"]');
const budgetRange = document.querySelector('[data-hook="budgetRange"]');
const budgetFrom = document.querySelector('[data-hook="budgetFrom"]');
const budgetTo = document.querySelector('[data-hook="budgetTo"]');
const projectForm = document.querySelector('form');

import serializ from 'form-serialize';
import postmark from 'postmark';
//let postmarkClient = new postmark.Client("f0b1bad4-6a86-426c-80af-8e21cbf9807c");

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

let submitProject = function(e) {
  e.preventDefault();

  let formValues = serialize(projectForm, { hash: true });
  formValues.budget = budgetRange.noUiSlider.get();

  console.log(formValues);

  //postmarkClient.sendEmail({
    //"From": "donotreply@example.com",
    //"To": "pruett.kevin@gmail.com",
    //"Subject": `Project proposal for ${formValues.budget[0]} - ${formValues.budget[1]}`,
    //"TextBody": `
      //Name: ${formValues.fullName}\n
      //Email: ${formValues.email}\n
      //Phone Number: ${formValues.phone}\n
      //Project Details: ${formValues.projectDetails}\n
      //Budget: ${formValues.budget[0]} - ${formValues.budget[1]}
    //`
  //}, function(error, success) {
    //if(error) {
      //console.error("Unable to send: " + error.message);
      //return;
    //}
    //console.info("Delivered!")
  //});

  return false;
}

projectForm.addEventListener('submit', submitProject, false);
