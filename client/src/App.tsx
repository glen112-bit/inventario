import react from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/api/dashboard/stats' element={<Home/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
