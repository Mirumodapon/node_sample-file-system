class Stack {
  constructor() {
    this.objs = [];
    this.size = 0;
  }
  pop() {
    if (this.size !== 0) {
      --this.size;
      return this.objs.pop();
    }
    return null;
  }
  push(obj) {
    ++this.size;
    this.objs.push(obj);
  }
  check() {
    return this.objs[this.size - 1];
  }
  empty() {
    this.objs.length = 0;
    this.size = 0;
  }
}

const pathObjects = new Stack();
const pathArray = new Stack();
/* ==================================================== */
function updateCurrentFolder() {
  const pathDOM = document.querySelector('#current-path');
  pathDOM.innerHTML = pathArray.objs.join('/');

  const fileElement = (obj) =>
    `<li title="${obj.name}" class="file"><a href="/${obj.path.replaceAll(
      '\\\\',
      '/'
    )}" download><img src="/static/img/file.png"/><span>${obj.name}</span</a></li>`;
  const folderElement = (obj) =>
    `<li title="${obj.name}" class="folder" onclick="go('${obj.name}')"><img src="/static/img/folder.png"/><span>${obj.name}</span></li>`;

  function callback(type) {
    return function (x) {
      return type === 'file' ? fileElement(x) : folderElement(x);
    };
  }

  const folderDOM = document.querySelector('#folder');
  folderDOM.innerHTML = pathObjects
    .check()
    .children.filter((x) => x.type === 'directory')
    .map(callback('directory'))
    .join('');

  const fileDOM = document.querySelector('#file');
  fileDOM.innerHTML = pathObjects
    .check()
    .children.filter((x) => x.type === 'file')
    .map(callback('file'))
    .join('');

  const buttonDOM = document.getElementById('back');
  if (pathArray.objs.length < 1) buttonDOM.style.display = 'none';
  else buttonDOM.style.display = 'flex';
}

/* ==================================================== */
function fetchTree() {
  return new Promise(function (resolve, reject) {
    fetch('/tree')
      .then(function (response) {
        if (response.status === 200) return response;
        else reject('Can not fetch the tree.');
      })
      .then((response) => response.json())
      .then((obj) => resolve(obj));
  });
}
async function init() {
  const tree = await fetchTree();
  pathObjects.empty();
  pathObjects.push(tree);
  updateCurrentFolder();
}

init();
/* ==================================================== */
function go(folder) {
  for (let i of pathObjects.check().children) {
    if (i.type === 'file') continue;
    if (i.name === folder) {
      pathObjects.push(i);
      pathArray.push(i.name);
      break;
    }
  }
  updateCurrentFolder();
}
function goLast() {
  if (pathObjects.size > 1) {
    pathObjects.pop();
    pathArray.pop();
  }
  updateCurrentFolder();
}
