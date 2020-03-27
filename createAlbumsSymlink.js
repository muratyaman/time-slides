const path = require('path');
const fs = require('fs');
const config = require('./src/config');

function createAlbumsSymlink(source, destination) {
  let result = false;
  try {
    fs.symlinkSync(source, destination);
    result = true;
  } catch (err) {
    console.error('createAlbumSymlink', err.message);
  }
  return result;
}

const source      = config.albumRootDir;
const destination = path.resolve('assets', 'api', 'albums');
console.log('creating albums symlink', source, '==>', destination, '...');
const result = createAlbumsSymlink(source, destination);
console.log('creating albums symlink', source, '==>', destination, '...', result ? 'DONE' : 'FAILED');
