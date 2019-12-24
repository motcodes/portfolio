import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './photos.css'
import Toggle from './toggle'
import Modal from './modal'

const Photos = () => {
  const [isLoading, setLoding] = useState(false)
  const [photos, setPhotos] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const fetchPhotos = () => {
    setPageCount(pageCount + 1)
    const baseUrl = 'https://api.unsplash.com/users/matthiasoberholzer/photos'
    const options = {
      headers: {
        Authorization: `Client-ID 7fa359ea7087a00fe9e4d1e0646ecf7314644f43bb5687aeb1454f8152893109`,
      },
      params: {
        page: pageCount,
        per_page: 15,
      },
    }

    axios
      .get(baseUrl, options)
      .then(res => {
        console.log(photos.concat(res.data))
        setPhotos(photos.concat(res.data))
        setLoding(false)
      })
      .catch(err => {
        console.log('Error happened during fetching!', err)
      })
  }
  useEffect(() => {
    setLoding(true)
    fetchPhotos()
  }, [])

  return (
    <>
      <div className="row">
        {isLoading ? (
          <p>Loading</p>
        ) : (
          photos.map(p => (
            <Toggle>
              {({ on, toggle }) => (
                <>
                  <div className="imgContainer" key={p.id} onClick={toggle}>
                    <img
                      className="photo"
                      src={p.urls.regular}
                      itemProp="image"
                      itemScope=""
                      itemType="http://schema.org/ImageObject"
                    />
                  </div>
                  <Modal
                    on={on}
                    toggle={toggle}
                    name={p.name}
                    photo={p.urls.full}
                    url={p.links.download}
                  />
                </>
              )}
            </Toggle>
          ))
        )}
      </div>
      <button onClick={() => fetchPhotos()}>Load more</button>
    </>
  )
}

export default Photos
