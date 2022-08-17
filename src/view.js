/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */

import processingRequest from './processingRequest.js';

const renderInitial = (elements, i18nextInstance) => {
  Object.entries(elements.initial).map((item) => {
    const [key, valueElement] = item;
    valueElement.textContent = i18nextInstance.t(`${key}`);
  });
};

const renderErrors = (elements, errors) => {
  const [error] = errors;// берем только первую ошибку
  elements.input.classList.add('is-invalid');
  elements.feedback.classList.toggle('text-success', false);
  elements.feedback.classList.toggle('text-danger', true);
  elements.feedback.textContent = error;
};

const render = (elements, i18nextInstance) => (path, value) => {
  switch (path) {
    case 'form.errors':
      renderErrors(elements, value);
      break;

    case 'request':
      processingRequest(elements, i18nextInstance, value);
      // value имеет вид  = ['https://ru.hexlet.io/lessons.rss']
      break;

    case 'form.submitEvent':
      elements.form.reset();
      elements.input.classList.remove('is-invalid');
      elements.feedback.textContent = '';
      break;

    case 'init':
      renderInitial(elements, i18nextInstance);
      break;

    default:
      break;
  }
};
export default render;
