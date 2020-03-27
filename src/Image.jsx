import React from 'react';

function Image({ album, currentImageIdx, file, imageSource }){
  return (
    <div className='canvas'>
      <h3>{file} <span className='image-idx'>[{currentImageIdx+1} of {album.files.length}]</span></h3>
      <img src={imageSource} alt='' />
    </div>
  );
}

export default Image;