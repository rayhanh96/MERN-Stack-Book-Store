import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateBook from './pages/CreateBook.tsx'
import DeleteBook from './pages/DeleteBook.tsx'
import EditBook from './pages/EditBook.tsx'
import ShowBook from './pages/ShowBook.tsx'
import Home from './pages/Home.tsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreateBook/>} />
      <Route path='/books/details/:id' element={<ShowBook/>} />
      <Route path='/books/edit/:id' element={<EditBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />
    </Routes>
  )
}

export default App