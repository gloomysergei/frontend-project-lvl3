import axios from 'axios';
import processingXmlDocument from './processingXmlDocument.js';
import renderHTML from './renderHTML.js';

const processingRequest = (elements, i18nextInstance, value) => {
  // const url = value[0];
  const [url] = value;

  axios.get(`https://allorigins.hexlet.app/raw?url=${url}&disableCache=true`)
    .then((response) => response.data)
    .then((data) => new DOMParser().parseFromString(data, 'text/xml'))
    .then((xmlDoc) => processingXmlDocument(xmlDoc))
    .then((data) => renderHTML(elements, i18nextInstance, data))
    .catch((error) => console.log(error));//  сделать обработку сетевой ошибки!!!
};
export default processingRequest;
