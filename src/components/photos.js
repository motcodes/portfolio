import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './photos.css'

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
            <div className="imgContainer">
              <img
                className="photo"
                key={p.id}
                src={p.urls.small}
                itemProp="image"
                itemScope=""
                itemType="http://schema.org/ImageObject"
              />
            </div>
          ))
        )}
        <button
          onClick={() => {
            fetchPhotos()
          }}
        >
          Load more
        </button>
      </div>
    </>
  )
}

export default Photos
