import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [buckets, setBuckets] = useState([])
  const [selectedBucket, setSelectedBucket] = useState('')
  const [objects, setObjects] = useState([])
  const [selectedObject, setSelectedObject] = useState('')
  const [content, setContent] = useState('')

  const API_URL =
    'https://0s3p84nqfb.execute-api.us-east-1.amazonaws.com/dev/api'

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setBuckets(response.data))
      .catch((error) => console.error('Error fetching buckets:', error))
  }, [])

  useEffect(() => {
    if (selectedBucket) {
      axios
        .get(`${API_URL}?bucket=${selectedBucket}`)
        .then((response) => setObjects(response.data))
        .catch((error) => console.error('Error fetching objects:', error))
    }
  }, [selectedBucket])

  useEffect(() => {
    if (selectedBucket && selectedObject) {
      axios
        .get(`${API_URL}?bucket=${selectedBucket}&key=${selectedObject}`)
        .then((response) => setContent(response.data))
        .catch((error) =>
          console.error('Error fetching object content:', error)
        )
    }
  }, [selectedBucket, selectedObject])

  return (
    <div className="app">
      <h1>Workshop 6:</h1>
      <div>
        <label>Select Bucket: </label>
        <select
          value={selectedBucket}
          onChange={(e) => setSelectedBucket(e.target.value)}
        >
          <option value="">-- Choose a bucket --</option>
          {buckets.map((bucket) => (
            <option key={bucket} value={bucket}>
              {bucket}
            </option>
          ))}
        </select>
      </div>

      {selectedBucket && (
        <div>
          <label>Select Object: </label>
          <select
            value={selectedObject}
            onChange={(e) => setSelectedObject(e.target.value)}
          >
            <option value="">-- Choose an object --</option>
            {objects.map((obj) => (
              <option key={obj} value={obj}>
                {obj}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedObject && (
        <div>
          <h3>Content:</h3>
          <pre>{content}</pre>
        </div>
      )}
    </div>
  )
}

export default App
