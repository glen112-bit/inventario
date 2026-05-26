import react, { useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'

function Home (){
  const [data, setData] = useState([])

  useEffect(()=> {
    axios .get('http://localhost:5173/api/dashboard/stats')
      .then(res => {
        // console.log(res.data)
        setData(res.data.stats)
      })
    .catch(err => console.log(err))
  },[])
  return(
    <Dashboard data={data}/> 
  )  
}
export default Home
