const path = require('path');
const fs = require('fs');
const config = require('./src/config');

// e.g. '/Users/murat/backup/Photos';
const rootPath = config.albumRootDir;

const albumsJsonFile = path.resolve('src', 'albums.json');

const extensionPatterns = [
  /.+\.jpg$/i,
  /.+\.jpeg$/i,
  /.+\.png$/i,
  /.+\.bmp$/i,
];

const albums = []; // individual folders containing some images, key is full path of folder

function newAlbum(path, level, pathBaseName){
  const entries = fs.readdirSync(path, { withFileTypes: true });

  const files = [];
  entries.forEach(entry => {
    const name = entry.name;

    if (entry.isDirectory()) {

      if (level <= 5) { // limit it, just in case
        newAlbum(path + '/' + name, level + 1, name); // RECURSION * * *
      }

    } else if (entry.isFile()) { // process files

      extensionPatterns.some(pattern => { // loop and break when a match found
        const found = String(name).match(pattern);
        if (found) {
          files.push(name);
        }
        return found; // true ==> break
      });

    }
  });

  if (files.length) { // we found some files, create a new album entry
    albums.push({
      // make it user-friendly: remove rootPath
      name: String(path).replace(rootPath + '/', ''),

      // prepend rootPath when using album files
      path: String(path).replace(rootPath, ''),

      files,
    });
    //console.log('-'.repeat(level), pathBaseName, files.length);
  }

}

console.log('creating albums', rootPath, 'in', albumsJsonFile, '...');
newAlbum(rootPath, 1, ''); // recursive * * *

fs.writeFileSync(albumsJsonFile, JSON.stringify(albums, null, ' '));
console.log('creating albums', rootPath, 'in', albumsJsonFile, '... DONE');
