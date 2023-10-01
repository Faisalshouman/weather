import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import moment from 'moment/moment';


export const fetchWeather = createAsyncThunk('Weather/fetchWeather',
async ()=>{
   const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=31.95&lon=35.91&appid=3bba547878475300932eeb9c47fe91bb')

         const temprat= Math.round(response.data.main.temp-273.15)
         const descrip= response.data.weather[0].description
         const min= Math.round(response.data.main.temp_min-273.15)
         const max= Math.round(response.data.main.temp_max-273.15)
         const icon= `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
         const time = moment().format('MMMM Do YYYY, h:mm:ss a')


        return {temprat,descrip,min,max,icon,time}

    })

const WeatherSlice = createSlice({
        name: 'Weather',
        initialState: {
          weather: {},
          isLoading: false,
        },
    reducers: {
        changeAction: (state,action)=>{
            return state
        }
    },

    extraReducers(builder){
        builder
        .addCase(fetchWeather.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(fetchWeather.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.weather = action.payload
        })
        .addCase(fetchWeather.rejected,(state,action)=>{
            state.isLoading = false;
        })
    }
})

export default WeatherSlice.reducer 