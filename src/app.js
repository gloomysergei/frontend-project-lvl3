import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';

const app = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    button: document.getElementById('rss-submit'),
    feeds: document.querySelector('.feeds'),
    feedback: document.querySelector('.feedback'),
  };
  const state = {
    form: {
      processState: '',
      errors: [],
      submitEvent: 0,
    },
    feeds: [],
  };
  const watchState = onChange(state, render(elements));

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const itemTask = {
      name: formData.get('url'),
    };

    const schema = yup.object().shape({
      name: yup.string().url().notOneOf(watchState.feeds).required(),
    });

    schema.validate(itemTask)
      .then((value) => {
        watchState.feeds.unshift(value.name);
        watchState.form.processState = 'sending';
        watchState.form.processState = 'sent';
      })
      .catch((err) => {
        watchState.form.errors = err.errors;
      });
  });

  elements.input.addEventListener('focusin', () => {
    watchState.form.submitEvent += 1;
  });
};
export default app;
