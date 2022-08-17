/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */

const headerTagGeneration = (name) => {
  const div = document.createElement('div');//  наименование Posts или Feeds
  div.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = name;
  div.append(h2);
  return div;
};

const renderFeeds = (fields) => {
  const div = document.createElement('div');//  Основной div
  div.classList.add('card', 'border-0');

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  h3.classList.add('h6', 'm-0');
  h3.textContent = fields.title;
  p.classList.add('m-0', 'small', 'text-black-50');
  p.textContent = fields.description;
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  li.append(h3, p);
  ul.append(li);

  div.append(headerTagGeneration('Фиды'), ul);
  return div;
};

const renderPosts = (filds) => {
  const div = document.createElement('div');//  Основной div
  div.classList.add('card', 'border-0');

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const node = filds.map((item) => {
    // const { link, title } = item;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.setAttribute('data-id', '2'); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('href', item.link);
    a.textContent = item.title;
    li.append(a);
    return li;
  });
  ul.append(...node);

  div.append(headerTagGeneration('Посты'), ul);
  return div;
};

const renderHTML = (elements, i18nextInstance, data) => {
  const [feeds, posts] = data;

  elements.feeds.append(renderFeeds(feeds));
  elements.posts.append(renderPosts(posts));
  elements.feedback.classList.toggle('text-danger', false);// Замена класса для зеленой подсветки
  elements.feedback.classList.toggle('text-success', true);// выводимой строки
  elements.feedback.textContent = i18nextInstance.t('success'); //  'RSS успешно загружен'
};
export default renderHTML;

/*  формирование feeds
<div class="card border-0">
  <div class="card-body">
    <h2 class="card-title h4">Фиды</h2>
  </div>
  <ul class="list-group border-0 rounded-0">
    <li class="list-group-item border-0 border-end-0">
      <h3 class="h6 m-0">Новые уроки на Хекслете</h3>
      <p class="m-0 small text-black-50">Практические уроки по программированию</p>
    </li>
  </ul>
</div>
*/

/*  формирование posts
<div class="card border-0">
  <div class="card-body">
    <h2 class="card-title h4">Посты</h2>
  </div>
  <ul class="list-group border-0 rounded-0">
    <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
      <a href="https://ru.hexlet.io/courses/js-basic-algorithms/lessons/recursion/theory_unit" class="fw-bold" data-id="2" target="_blank" rel="noopener noreferrer">Рекурсия / Основы алгоритмов и структур данных</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="2" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button></li><li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"><a href="https://ru.hexlet.io/courses/js-functions/lessons/iterative/theory_unit" class="fw-bold" data-id="3" target="_blank" rel="noopener noreferrer">Итеративный процесс / JS: Функции</a><button type="button" class="btn btn-outline-primary btn-sm" data-id="3" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
      <a href="https://ru.hexlet.io/courses/js-functions/lessons/recursion/theory_unit" class="fw-bold" data-id="4" target="_blank" rel="noopener noreferrer">Рекурсия / JS: Функции</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="4" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
    </li>
    .....
    <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
      <a href="https://ru.hexlet.io/courses/ruby-basics/lessons/arrays-definitions/theory_unit" class="fw-bold" data-id="5" target="_blank" rel="noopener noreferrer">Способы определения массивов / Основы языка Ruby</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="5" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
    </li>
</div>
*/
