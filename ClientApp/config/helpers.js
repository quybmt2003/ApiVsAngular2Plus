var path = require('path')

var _root = path.resolve(__dirname, '..')

console.log(root);

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

exports.root = root;