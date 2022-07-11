import * as yup from 'yup';
import { setLocale } from 'yup';

const validate = (urlName, state) => {
  const watchState = state;
  setLocale({
    mixed: {
      required: 'Поле обязательно для заполнения',
      notOneOf: 'RSS уже существует',
    },
    string: {
      url: 'Ссылка должна быть валидным URL',
    },
  });

  const schema = yup.object().shape({
    name: yup.string().url().required().notOneOf([watchState.feeds]),
  });
  schema.validate(urlName) // urlName - это объект  name: formData.get('url'),
    .then((value) => {
      watchState.feeds.unshift(value.name); // ---> запрос GET
      watchState.form.processState = 'sending';
      watchState.form.processState = 'sent';
    })
    .catch((err) => {
      watchState.form.errors = err.errors;
    });
};
export default validate;
