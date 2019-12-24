import React from 'react'
import Portal from './portal'

import './modal.css'

const Modal = ({ name, photo, url, on, toggle }) => {
  return (
    <Portal>
      {on && (
        <div className="modalWrapper" onClick={toggle}>
          <div className="modalCard">
            <img
              className="fullSizePhoto"
              src={photo}
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
