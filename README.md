# Time Slides

Generate and serve locally albums of your photos using basic slideshow.

This app is built on Node and React. Specifically, I used create-react-app and express.js.

Dependencies to note:

```plain
dotenv
node-sass
http-proxy-middleware
react-transition-group
```

## Installation

```sh
npm install
```

## Configuration

Copy sample environment file and edit.

```sh
cp .env_sample .env
```

Define folder for your photos:

```plain
REACT_APP_ALBUM_ROOT_DIR="~/photos"
```

Create folder `assets/api`

```sh
mkdir assets
mkdir assets/api
```

Create symlink to serve your photos in `assets/api/albums`

```sh
npm albums:symlink
```

Create file `src/albums.json`

```sh
npm albums:create
```

## Production

Build React app; this will create folder `build`

```sh
npm build
```

Serve as website using Express `server.js`

```sh
npm start:server
```

Open `http://localhost:54321`

## Development

On terminal one, start Express server

```sh
npm start:server
```

On terminal two:

```sh
npm start
```

Open `http://localhost:3000`
