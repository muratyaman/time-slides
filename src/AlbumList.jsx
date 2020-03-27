import React from 'react';

const maxChars = 30;

function AlbumList({ albums, currentAlbumIdx, onClick }){
  return (
    <ul className='albumlist'>
      {albums.map((row, arrIdx) => {
        const { album, idx } = row;
        const { name, files } = album;
        const shortName = maxChars < String(name).length ? String(name).slice(0, maxChars) + '...' : name;
        const props = {
          className: idx === currentAlbumIdx ? 'selected' : '',
          onClick: (ev) => onClick(ev, idx),
        };
        return (
          <li key={idx} {...props}>
            <span className='name' title={name}>{shortName}&nbsp;</span>
            <span className='file-count'>[{files.length}]</span>
          </li>
        )
      })}
    </ul>
  )
}

export default AlbumList;
