# Time Slides
Generate and serve locally albums of your photos using basic slideshow.

This app is built on Node and React. Specifically, I used create-react-app and express.js.

Dependencies to note:

```
dotenv
node-sass
http-proxy-middleware
react-transition-group
```

## Installation

```
yarn install
```

## Configuration

Copy sample environment file and edit.

```
cp .env_sample .env
```

Define folder for your photos:

```
REACT_APP_ALBUM_ROOT_DIR="~/photos"
```

Create folder `assets/api`

```
mkdir assets
mkdir assets/api
```

Create symlink to serve your photos in `assets/api/albums`

```
yarn albums:symlink
```

Create file `src/albums.json`

```
yarn albums:create
```

## Production

Build React app; this will create folder `build`

```
yarn build
```

Serve as website using Express `server.js`

```
yarn start:prod
```

Open `http://localhost:54321`

## Development

On terminal one, start Express server

```
yarn start:prod
```

On terminal two:

```
yarn start
```

Open `http://localhost:3000`
