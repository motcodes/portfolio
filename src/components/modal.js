import React from 'react'
import Portal from './portal'

import './modal.css'

const Modal = ({ name, photo, alt, url, on, toggle }) => {
  return (
    <Portal>
      {on && (
        <div className="modalWrapper" onClick={toggle} role="modal">
          <div className="modalCard">
            <img
              className="fullSizePhoto"
              src={photo}
              alt={alt}
              itemProp="image"
              itemScope=""
              itemType="http://schema.org/ImageObject"
            />
            <span>{name}</span>
            <span>
              <a href={url}>Download from Unsplash</a>
            </span>
          </div>
          <div onClick={toggle} className="modalBackground" />
        </div>
      )}
    </Portal>
  )
}

export default Modal
