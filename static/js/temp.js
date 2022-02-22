import Stack from '/static/js/Stack.js';

const pathObjects = new Stack();
const pathArray = new Stack();

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

function updateCurrentFolder(filesArray) {
  console.log(pathObjects.check());
  console.log(pathArray.objs);
}
// function createFileElement({ name, path }) {}
// function createFolderElement({ name, path }) {}

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
  pathObjects.pop();
  pathArray.pop;
  updateCurrentFolder();
}

(async function () {
  const tree = await fetchTree();
  pathObjects.push(tree);
})();
