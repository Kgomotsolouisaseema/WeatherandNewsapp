import "./index.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import CurrentNews from "./components/current-news/CurrentNews";

import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [newsData, setNewsData] = useState([]);
  console.log(currentWeather);

  //function for current weather and forecast
  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ); //&units=metric = specificies the return digits of oyur readings
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        try {
          const newsApiUrl = ` https://newsapi.org/v2/top-headlines?lat=${lat}&lon=${lon}&apiKey=018ab5e1d2924cf788f6b9303706e653`;
          const response = await fetch(newsApiUrl);
          if (!response.ok) {
            throw new Error("Request failed");
          }
          const data = await response.json();
          setNewsData(data.articles);
          
        } catch (error) {
          console.log("Error fetching news data", error);
        }

      })
      .catch((err) => console.log("error fetching weather and forecast ", err));
  };

  
  

  console.log(currentWeather);
  console.log(forecast?.list); //?

  // const fetchNews = async () => {
  //   try {
  //     const response = await fetch(newsApiUrl);
  //     if (!response.ok) {
  //       throw new Error("Request failed");
  //     }
  //     const data = await response.json();
  //     setNewsData(data.articles);
      
  //   } catch (error) {
  //     console.log("Error fetching news data", error);
  //   }
  // };

  //function to filter forecast data
  //  function filterMiddayTimestamps(forecast){
  //  // Filter the forecast data to keep 12:00 timestamp only
  //  const middayTimestamp = forecast.filter((data)=>{
  //   const timestamp = new Date(data.list.dt_txt);
  //   return timestamp.getHours() === 12 && timestamp.getMinutes() === 0;
  //  });

  //  return middayTimestamp;
  //  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />} {/*data={middayTimestamps} */}
      <div className="flex-item">
        {newsData.map((news, index) => (
          <CurrentNews key={index} newsItem={news} className="news-card" />
        ))}
        {/* <button onClick={fetchNews}>FetchNews</button> */}
      </div>
    </div>
  );
}

export default App;
