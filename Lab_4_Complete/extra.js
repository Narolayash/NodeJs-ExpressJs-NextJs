const { constants } = require('buffer');
const path = require('path');

// path.basename(path[, suffix]);
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
console.log(path.win32.basename('C:\\foo.html', '.html')); // .html
console.log(path.win32.basename('C:\\foo.HTML', '.html')); // .HTML

// path.dirname(path);
console.log(path.dirname('/foo/bar/baz/asdf/quux'));

// path.extname(path);
console.log(path.extname('index.html'));
console.log(path.extname('index.coffee.md'));
console.log(path.extname('index.'));
console.log(path.extname('index'));
console.log(path.extname('.index')); 
console.log(path.extname('.index.md')); 

// path.format(pathObject);
// pathObject  =>> {
    // dir: 
    // root:
    // base:
    // name:
    // ext:
// }
const newPath = path.format({
  dir: 'C:\\path\\dir',
  base: 'file.txt',
});
console.log(newPath);
// Returns: 'C:\\path\\dir\\file.txt'

// path.matchGlob(path, pattern);
console.log(path.matchesGlob('/foo/bar', '/foo/*'));// true
console.log(path.matchesGlob('/foo/bar*', 'foo/bird')); // false

// path.isAbsolute(path);
console.log(path.isAbsolute('//server')); // true
console.log(path.isAbsolute('\\\\server')); // true
console.log(path.isAbsolute('C:/foo/..')); // true
console.log(path.isAbsolute('C:\\foo\\..')); // true
console.log(path.isAbsolute('bar\\baz')); // false
console.log(path.isAbsolute('bar/baz')); // false
console.log(path.isAbsolute('.'));      // false


// path.join([...paths]);
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); // path ne join kri ne normalize pan karse
console.log(path.join(''));
console.log(path.join());

// path.normalize(path);
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));

// path.parse(path);
pathObj = path.parse('C:\\path\\dir\\file.txt');
console.log(pathObj);
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// path.relative(from, to)
// 'from' thi laine 'to' sudhi java no path relative path return karse
console.log(path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'));

// path.resolve([...paths]) also normalize the path
// The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
// t builds an absolute path by resolving segments from right to left.
path.resolve('a', 'b', 'c');
// Suppose your current working directory is 'C:\project'
// return: 'C:\project\a\b\c'

path.resolve('a', '/b', 'c');
// 'c' → relative
// '/b' → absolute path found → STOP
// gnore 'a'
// retutn: '/b/c'
// Real-world usage 💡
// Get absolute path of a file
path.resolve('data', 'users.json');

