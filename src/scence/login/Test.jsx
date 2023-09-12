import axios from 'axios'
import React from 'react'
const test=async()=>{
  const response=await axios.post("https://13.49.44.225:4000/test");
  console.log(response)
}
function Test() {
  return (
    <div>
          

    </div>
  )
}

export default Test