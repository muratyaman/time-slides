import { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AlbumList from './AlbumList';
import Image from './Image';
import FilmStrip from './FilmStrip';
import { lg } from './helpers';

class AlbumShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideShowOn: false,
      currentAlbumIdx: 0,
      currentImageIdx: 0,
    };
    this.timer = 0;
  }

  currentAlbum = () => {
    const { albums } = this.props;
    if (!albums || albums.length === 0) return null;

    const { currentAlbumIdx } = this.state;
    if (albums[currentAlbumIdx]) {
      return albums[currentAlbumIdx];
    } else {
      return null;
    }
  };

  makeImageSource = ({ album, albumBaseUrl, file }) => {
    return `${albumBaseUrl}${album.path}/${file}`;
  };

  makeFilmStripImages = ({ album, albumBaseUrl, currentImageIdx }) => {
    const images = [];
    const maxIdx = album.files.length - 1;
    for (let idx = currentImageIdx - 3; idx <= currentImageIdx + 3; idx++) {
      if (0 <= idx && idx <= maxIdx) {
        const file = album.files[idx];
        const image = {
          idx,
          src: this.makeImageSource({ album, albumBaseUrl, file }),
        };
        images.push(image); // TODO: URLs for resized images
      }
    }
    //console.info('makeFilmStripImages', images);
    return images;
  };

  makeAlbumList = ({ albums, currentAlbumIdx }) => {
    const albumsForList = [];
    const maxIdx = albums.length - 1;
    for (let idx = currentAlbumIdx - 19; idx <= currentAlbumIdx + 19; idx++) {
      if (0 <= idx && idx <= maxIdx) {
        const album = albums[idx];
        albumsForList.push({ idx, album });
      }
    }
    return albumsForList;
  };

  albumCount = () => {
    const { albums } = this.props;
    return !albums && albums.length ? albums.length : 0;
  };

  startSlideShow = (currentAlbumIdx = 0) => {
    this.setState({
      slideShowOn: true,
      currentAlbumIdx,
      currentImageIdx: 0,
    });
  };

  stopSlideShow = () => {
    this.setState({
      slideShowOn: false,
    });
  };

  randomAlbumIdx = () => {
    const { albums } = this.props;
    return Math.floor(Math.random() * albums.length);
  };

  goToNextSlide = (currentEffect) => {
    lg('AlbumShow.goToNextSlide', currentEffect);
    let { currentAlbumIdx, currentImageIdx } = this.state;
    const album = this.currentAlbum();

    currentImageIdx++; // increment image index

    if (album.files.length === currentImageIdx) { // end of album, go to next one
      // currentAlbumIdx++; // sequential
      currentAlbumIdx = this.randomAlbumIdx();
      currentImageIdx = 0; // go to the first image of album
    }

    // if sequential
    //if (0 < currentAlbumIdx && this.albumCount() === currentAlbumIdx) { // end of album list
    //  currentAlbumIdx = 0; // go to the first album
    //  currentImageIdx = 0;
    //}

    this.setState({
      currentAlbumIdx,
      currentImageIdx,
      currentEffect,
    });
  };

  slideShow = (currentEffect) => {
    const { slideShowOn } = this.state;
    if (slideShowOn) {
      this.goToNextSlide(currentEffect);
    }
  };

  componentDidMount() {
    this.startSlideShow(this.randomAlbumIdx());
    this.timer = setInterval(this.slideShow, 5000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    const { albums, albumBaseUrl } = this.props;
    const { slideShowOn, currentAlbumIdx, currentImageIdx } = this.state;

    const albumsForList = this.makeAlbumList({ albums, currentAlbumIdx });
    const albumListProps = {
      albums: albumsForList,
      currentAlbumIdx,
      onClick: (ev, idx) => { this.startSlideShow(idx) },
    };

    let album, imageProps, filmStripProps;
    if (slideShowOn) {
      album = this.currentAlbum();
      const file = album.files[currentImageIdx];
      const imageSource = this.makeImageSource({ album, albumBaseUrl, file });
      imageProps = { album, currentImageIdx, file, imageSource };

      filmStripProps = {
        images: this.makeFilmStripImages({ album, albumBaseUrl, currentImageIdx }),
        currentImageIdx,
      };
    }
    return (
      <section>
        <AlbumList {...albumListProps} />
        {slideShowOn && (
          <article>
            <h2>{album.name} <span className='album-idx'>[{currentAlbumIdx+1} of {albums.length}]</span></h2>

            <FilmStrip {...filmStripProps} />

            <TransitionGroup>
              <CSSTransition key={currentAlbumIdx + '-' + currentImageIdx} in={true} timeout={1000} classNames='item'>
                <Image {...imageProps} />
              </CSSTransition>
            </TransitionGroup>

          </article>
        )}
      </section>
    )
  }
}

export default AlbumShow;
