import { useState, useEffect } from 'react'
import axios from 'axios'
import './style/App.css'
import './style/Post.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PaginatedItems from './PaginatedItems'

export default function App() {

  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(true)

  const url = 'https://jsonplaceholder.typicode.com/posts'
  // const url = 'http://localhost:3000/api/data' // попытка подключить свой сервер

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url)
      setdata(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
    <>
      <div className="loader_bg">
        <h6>Загрузка...</h6>
        <div className='loader'></div>
      </div>
    </>
    )
  }
  

  return (
      <Router>
        <Routes>
          <Route path="/" element={<PaginatedItems itemsPerPage={6} items={data} />} />
          <Route path="/posts-reactJS/page/:page" element={<PaginatedItems itemsPerPage={6} items={data} />} />
        </Routes>
      </Router>
  )
}