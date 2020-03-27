import React from 'react';
import config from './config';
import AlbumShow from './AlbumShow';
import albums from './albums'; // build JSON file at design time, rather than fetching it at runtime

class App extends React.Component {
  render() {
    const albumShowProps = { albums, albumBaseUrl: config.albumBaseUrl };
    return (
      <>
        <main>
          {albums && albums.length && (<AlbumShow {...albumShowProps}>error...</AlbumShow>)}
        </main>
      </>
    );
  }
}

export default App;
