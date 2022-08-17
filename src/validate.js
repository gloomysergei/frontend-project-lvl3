import * as yup from 'yup';
import { setLocale } from 'yup';

const validate = (urlName, i18nextInstance, state) => {
  const watchState = state;
  setLocale({
    mixed: {
      required: i18nextInstance.t('required'),
      notOneOf: i18nextInstance.t('notOneOf'),
    },
    string: {
      url: i18nextInstance.t('url'),
    },
  });

  const schema = yup.object().shape({
    name: yup.string().url().required().notOneOf([watchState.request]),
  });
  schema.validate(urlName) // urlName - это объект  name: formData.get('url'),
    .then((value) => watchState.request.unshift(value.name))
    .catch((err) => {
      watchState.form.errors = err.errors;
    });
};
export default validate;
