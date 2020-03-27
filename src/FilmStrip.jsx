import React from 'react';

function FilmStrip({ images, currentImageIdx }){
  return (
    <div className='filmstrip'>
      {images && images.map((row, arrIdx) => {
        const { src, idx } = row;
        const key = `${idx}-${src}`;
        const props = {
          src,
          className: idx === currentImageIdx ? 'selected' : '',
        };
        return (
          <img key={key} alt={src} {...props} />
        );
      })}
    </div>
  )
}

export default FilmStrip;
