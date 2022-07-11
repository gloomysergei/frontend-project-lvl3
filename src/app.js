/* eslint-disable array-callback-return */
// import * as yup from 'yup';
// import { setLocale } from 'yup';
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
    initial: {
      lead: document.querySelector('.lead'),
      label: document.querySelector('label'),
      example: document.querySelector('.example'),
    },
  };

  const state = {
    form: {
      processState: '',
      errors: [],
      submitEvent: 0,
    },
    feeds: [],
    init: false,
  };
  const watchState = onChange(state, render(elements, i18nextInstance));

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const itemTask = {
      name: formData.get('url'),
    };
    validate(itemTask, watchState);
    // setLocale({
    //   mixed: {
    //     required: 'Поле обязательно для заполнения',
    //     notOneOf: 'RSS уже существует',
    //   },
    //   string: {
    //     url: 'Ссылка должна быть валидным URL',
    //   },
    // });

    // const schema = yup.object().shape({
    //   name: yup.string().url().required().notOneOf([watchState.feeds]),
    // });
    // schema.validate(itemTask)
    //   .then((value) => {
    //     watchState.feeds.unshift(value.name);
    //     watchState.form.processState = 'sending';
    //     watchState.form.processState = 'sent';
    //   })
    //   .catch((err) => {
    //     watchState.form.errors = err.errors;
    //   });
  });

  elements.input.addEventListener('focusin', () => {
    watchState.form.submitEvent += 1;
  });

  watchState.init = true;
};
export default app;
