/* eslint-disable array-callback-return */

import i18next from 'i18next';
import onChange from 'on-change';
import render from './view.js';
import resources from './locales/index.js';
import validate from './validate.js';

const app = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    button: document.getElementById('rss-submit'),
    feeds: document.querySelector('.feeds'),
    feedback: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
    initial: {
      lead: document.querySelector('.lead'),
      label: document.querySelector('label'),
      example: document.querySelector('.example'),
    },
  };

  const state = {
    form: {
      errors: [],
      submitEvent: 0,
    },
    feeds: {},
    posts: [],
    request: [],
    init: false,
  };
  const watchState = onChange(state, render(elements, i18nextInstance));

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const urlName = {
      name: formData.get('url'),
    };
    validate(urlName, i18nextInstance, watchState);
  });

  elements.input.addEventListener('focusin', () => {
    watchState.form.submitEvent += 1;
  });

  watchState.init = true;
};
export default app;
