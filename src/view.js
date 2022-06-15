/* eslint-disable no-param-reassign */
const renderErrors = (elements, errors) => {
  const [error] = errors;// берем только первую ошибку
  elements.input.classList.add('is-invalid');
  elements.feedback.textContent = error;
};

const renderTask = (elements, value) => {
  const taskElements = value.map((item) => {
    const el = document.createElement('li');
    el.textContent = item;
    return el;
  });
  elements.feeds.replaceChildren(...taskElements);
};

const handleProcessState = (elements, processState) => {
  switch (processState) {
    case 'filling':
      elements.form.reset();
      elements.input.classList.remove('is-invalid');
      elements.button.disabled = false;
      elements.input.disabled = false;
      break;

    case 'sent':
      elements.button.disabled = false; // разблокировка кнопки во время отправки формы
      elements.input.disabled = false; // разблокировка полей формы во время отправки формы
      break;

      // case 'error': //  ошибка сети
      //   elements.button.disabled = false;
      //   break;

    case 'sending':
      elements.button.disabled = true; // блокировка кнопки во время отправки формы
      elements.input.disabled = true; // блокировка полей формы во время отправки формы
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

const render = (elements) => (path, value) => {
  switch (path) {
    case 'form.processState':
      handleProcessState(elements, value);
      break;

    case 'form.errors':
      renderErrors(elements, value);
      break;

    case 'feeds':
      renderTask(elements, value);
      break;

    case 'form.submitEvent':
      elements.form.reset();
      elements.input.classList.remove('is-invalid');
      elements.feedback.textContent = '';
      break;

    default:
      break;
  }
};
export default render;
