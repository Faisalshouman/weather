import './App.css';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';


let canceltoken = null

function App() {
  const [time,setTime] = useState('')
  const [temp , setTemp] = useState({
    temprat: 30,
    descrip: '',
    min: 30,
    max: 30,
    icon: null,
  })
  useEffect(()=>{
  setTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
  axios.get('https://api.openweathermap.org/data/2.5/weather?lat=31.95&lon=35.91&appid=3bba547878475300932eeb9c47fe91bb' , {
    Canceltoken : new axios.CancelToken((c)=>{canceltoken = c})
  })
  .then(function (response) {
    console.log(response.data)
    setTemp({
      temprat: Math.round(response.data.main.temp-273.15),
      descrip: response.data.weather[0].description,
      min: Math.round(response.data.main.temp_min-273.15),
      max: Math.round(response.data.main.temp_max-273.15),
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  return ()=>{canceltoken()}
},[])
  return (

    <div className="App" style={{ background: "linear-gradient(to bottom right, #00008B, #00BFFF, #2CD3E1)", backgroundSize: "cover", minHeight: "100vh", display: "flex", alignItems: "center" }} >
<Container maxWidth="sm" >
<div style={{maxWidth:"80%",padding:"27px", borderRadius:"16px" , backgroundColor:"#1da1f2" , boxShadow: "10px rgba(0,0,0,0.5)"}}>
  <div >
    <div style={{display:"flex", justifyContent:"start", alignItems:"end",}}>
      <Typography variant='h2'>
        Amman
      </Typography>
      <Typography variant='h5' marginLeft="20px">
        {time}
      </Typography>
    </div>
    <hr style={{ height: '1px', borderRadius: '1px', margin: '10px 0', borderStyle: 'solid' , backgroundColor: '#f4f4f2e8' , color:'#f4f4f2e8'}} />

    <div style={{ display: "flex", justifyContent: "space-between", }}>
  <div >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant='h1'>
        {temp.temprat}
      </Typography>
      <img src= {temp.icon} alt='description icon' />
    </div>
    <Typography variant='h5'>
      {temp.descrip}
    </Typography>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h5>min: {temp.min}</h5>
      <h5>|</h5>
      <h5>max: {temp.max}</h5>
    </div>
  </div>
  <WbSunnyIcon style={{ fontSize: "190px" , color:"#f4f4f2e8" }} />
</div>

  </div>
</div>
</Container>
    </div>

  );
}

export default App;
