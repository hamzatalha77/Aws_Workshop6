import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [selectedBucket, setSelectedBucket] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [selectedContent, setSelectedContent] = useState('')
  const [buckets, setBuckets] = useState([])

  useEffect(() => {
    fetch('https://ip28zwesd0.execute-api.us-east-1.amazonaws.com/dev/api')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.body)
        const parsedData = JSON.parse(jsonData.body)
        const bucketNames = Object.keys(parsedData)
        setBuckets(bucketNames)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleBucketSelect = (e) => {
    const selectedBucket = e.target.value
    setSelectedBucket(selectedBucket)
    setSelectedFile('')
    setSelectedContent('')
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.value
    setSelectedFile(selectedFile)

    const parsedData = JSON.parse(data)
    const selectedBucketData = parsedData[selectedBucket]
    const selectedFileData = selectedBucketData.find(
      (file) => file.FileKey === selectedFile
    )

    if (selectedFileData) {
      setSelectedContent(selectedFileData.FileContent)
    } else {
      setSelectedContent('')
    }
  }

  return (
    <div>
      <h1>Workshop 6</h1>

      <div>
        <label>Select a bucket:</label>
        <select value={selectedBucket} onChange={handleBucketSelect}>
          <option value="">Select a bucket</option>
          {buckets.map((bucketName) => (
            <option key={bucketName} value={bucketName}>
              {bucketName}
            </option>
          ))}
        </select>
      </div>

      {selectedBucket && (
        <div>
          <label>Select a file:</label>
          <select value={selectedFile} onChange={handleFileSelect}>
            <option value="">Select a file</option>
            {JSON.parse(data)[selectedBucket].map((file) => (
              <option key={file.FileKey} value={file.FileKey}>
                {file.FileKey}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedContent && (
        <div>
          <h2>Content:</h2>
          <pre>{selectedContent}</pre>
        </div>
      )}
    </div>
  )
}

export default App
