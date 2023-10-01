import './App.css';
import Container from '@mui/material/Container';
import { CircularProgress, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherAPIslice';




function App() {
  const dispatch = useDispatch()
  const isloading = useSelector((state)=>{
    return state.weather.isLoading
  })

  const temp = useSelector((state)=>{
    return state.weather.weather
  })






  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);
  
  
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
        {temp.time}
      </Typography>
    </div>
    <hr style={{ height: '1px', borderRadius: '1px', margin: '10px 0', borderStyle: 'solid' , backgroundColor: '#f4f4f2e8' , color:'#f4f4f2e8'}} />

    <div style={{ display: "flex", justifyContent: "space-between", }}>
  <div >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

      {isloading ? (
        <CircularProgress style={{color:'white'}}/>
      ) : ('')}
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
