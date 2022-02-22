const dirTree = require('directory-tree');

module.exports = function (PATH) {
  return new Promise(function (resolve, reject) {
    dirTree(PATH, { attributes: ['type', 'extension'] }, null, (tree, path, __) => {
      if (PATH === path) resolve(tree);
      // else reject(0);
    });
  });
};
