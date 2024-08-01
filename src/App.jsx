import React, { useEffect, useState } from 'react'

import searchIcon from "./assets/search.png"
import sunClearIcon from "./assets/sun.png"
import moonClearIcon from "./assets/moon.png"
import sunCloudIcon from "./assets/partly-cloudy.png"
import moonCloudIcon from "./assets/cloudy-night.png"
import cloud from "./assets/cloud.png"
import rainIcon from "./assets/rain.png"
import sunRain from "./assets/cloudy.png"
import moonRain from "./assets/rain-night.png"
import thunderStorm from "./assets/thunderstrom.png"
import mist from "./assets/mist.png"
import windIcon from "./assets/wind.png"
import snowIcon from "./assets/snow.png"
import humidityIcon from "./assets/humidity.png"
import wrong from "./assets/wrong.png"
import Header from "./Header.jsx"


const WeatherDetails = ({icon,temp, city, country, lat, log, humidity, wind}) => {

  
  return (<>
    <Header />
    <div className='flex items-center justify-center'>
      <img src={icon} alt="image" className='p-5 px-2  lg:mt-2 mt-1 lg:mb-2 mb-1 lg:w-60 w-40' />
    </div>
    <div className='lg:mt-2 mt-1 text-3xl uppercase text-center font-bold'>{temp}°C</div>
    <div className='lg:mt-2 mt-1 lg:text-3xl text-2xl uppercase text-center text-orange-300 font-semibold'>{city}</div>
    <div className='lg:mt-2 mt-1 lg:text-2xl text-xl uppercase text-center font-semibold text-gray-500'>{country}</div>
    <div className='flex justify-center items-center gap-2 lg:mt-2 mt-1 text-center'>
      <div className='flex flex-col justify-center items-center lg:p-3 p-2'>
        <span className='lg:text-xl text-base'>Latitude</span>
        <span className='lg:text-2xl text-xl font-bold text-gray-500 lg:pt-2 pt-1'>{lat}</span>
      </div>
      <div className='flex flex-col justify-center items-center lg:p-3 p-2'>
        <span className='lg:text-xl text-base'>Longitude</span>
        <span className='lg:text-2xl text-xl font-bold text-gray-500 lg:pt-2 pt-1'>{log}</span>
      </div>
    </div>
    <div className='flex justify-between lg:mt-3 mt-2 lg:p-2 p-1'>
      <div className='text-center flex flex-col items-center'>
        <img src={humidityIcon} alt="humidityIcon" className='lg:w-10 w-8'/>
        <div className='lg:text-2xl text-xl font-bold text-gray-500 lg:pt-2 p-1'>{humidity}%</div>
        <div className='lg:text-xl text-base'>Humidity</div>
      </div>
      <div className='text-center flex flex-col items-center'>
        <img src={windIcon} alt="windIcon" className='lg:w-10 w-8'/>
        <div className='lg:text-2xl text-xl font-bold text-gray-500 lg:pt-2 p-1'>{wind} Km/h</div>
        <div className='lg:text-xl text-base'>Wind Speed</div>
      </div>
    </div>

    <div className='border border-orange-400 lg:mt-3 mt-1 p-4 rounded roumded-2xl flex items-center justify-center'>
      <p className='lg:text-xl text-base text-gray-400'>Designed By <a className='text-orange-300 lg:font-bold font-semibold' href='https://barathram3003.github.io/Portfolio/'>BarathRamana</a></p>
    </div>
  </>)
}



function App() {

  let api_key = "9f73c88cebc831a70407edb0c342b362"
  const [text, setText] = useState("Salem")

  const [icon, setIcon] = useState(sunClearIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("Salem")
  const [country, setCountry] = useState("IND")
  const [lat, setLat] = useState(0)
  const [log, setLog] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)

  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const weatherIconMap = {
    "01d": sunClearIcon,
    "01n": moonClearIcon,
    "02d": sunCloudIcon,
    "02n": moonCloudIcon,
    "03d": cloud,
    "03n": cloud,
    "04d": rainIcon,
    "04n": rainIcon,
    "09d": sunRain,
    "09n": moonRain,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderStorm,
    "11n": thunderStorm,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mist,
    "50n": mist,
  }

  const search = async () => {
  setLoading(true)
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

  try {
    let res = await fetch(url)
    let data = await res.json()
    if(data.cod === "404"){
      console.error("City not Found")
      setCityNotFound(true)
      setLoading(false)
      return
    }

    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.lon)
    const weatherIconCode = data.weather[0].icon
    setIcon(weatherIconMap[weatherIconCode] || sunClearIcon)
    setCityNotFound(false)
  }catch(error){
    console.error("An error occured", error.message)
    setError("An Error occured while fetching Weather Data")
  }finally{
    setLoading(false)
  }
}

  const handleCity = (e) => {
    setText(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }

  useEffect(function () {
    search()
  }, [])


  return (
    <>
      <div className='lg:w-[450px]   bg-white rounded-lg shadow-lg p-10'>
        <div className='flex w-[100:%] items-center border border-orange-400 rounded-md overflow-hidden'>
          <input type="text" placeholder='Search City' className='felx flex-1 h-7 p-3 outline-none  border-none '  onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <img src={searchIcon} alt="Search" className='w-12 p-2 cursor-pointer' onClick={() => search()}/>
          </div>
          

          {loading && <div className='mt-2 text-gray-500 text-xl text-center flex items-center justify-center'>
            <svg version="1.1" id="L7" className='lg:w-60 p-10 mt-2 ' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
              <path fill="#fbd38d" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
              c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
              <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate"
                  dur="2s" 
                  from="0 50 50"
                  to="360 50 50" 
                  repeatCount="indefinite" />
              </path>
              <path fill="#fbd38d" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
              c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
              <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate"
                  dur="1s" 
                  from="0 50 50"
                  to="-360 50 50" 
                  repeatCount="indefinite" />
              </path>
              <path fill="#fbd38d" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
              L82,35.7z">
              <animateTransform 
                  attributeName="transform" 
                  attributeType="XML" 
                  type="rotate"
                  dur="2s" 
                  from="0 50 50"
                  to="360 50 50" 
                  repeatCount="indefinite" />
              </path>
            </svg>
            </div>}
          { error && <div className='mt-4 flex flex-col items-center justify-center'>
            <img src={wrong} alt="wrong" className='lg:w-[150px] w-[80px]'  />
            <p className='mt-2 text-gray-500 text-xl text-center'>{error}</p></div>}
          { cityNotFound && <div className='mt-4 flex flex-col items-center justify-center' >
            <img src={wrong} alt="wrong" className='lg:w-[150px] w-[80px]'  />
            <p className='mt-2 text-gray-500 text-xl text-center'>City Not Found</p></div>}

          {!cityNotFound && !loading && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
      </div>
    </>
  )
}

export default App
