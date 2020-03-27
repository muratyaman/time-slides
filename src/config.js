// file used by App.jsx and ../createAlbumsJson.js and createAlbumsSymlink.js

// @see https://github.com/motdotla/dotenv
const dotenv = require('dotenv');
dotenv.config();

const pe = process.env;

// TODO: validate settings

module.exports = {

  appTitle: pe.REACT_APP_TITLE,
  appVersion: pe.REACT_APP_VERSION,
  appDesc: pe.REACT_APP_DESC,
  credits: pe.REACT_APP_CREDITS,

  // e.g. '/Users/murat/backup/Photos';
  albumRootDir: pe.REACT_APP_ALBUM_ROOT_DIR,

  // e.g. '/albums'
  albumBaseUrl: pe.REACT_APP_ALBUM_BASE_URL,

  serverPort: pe.REACT_APP_SERVER_PORT,
};
