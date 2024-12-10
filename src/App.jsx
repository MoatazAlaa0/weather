import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import ImgLogo from "./assets/images/logo2x.png";
import ImgBg from "./assets/images/banner.png";

const WeatherApp = () => {
  const [location, setLocation] = useState("Cairo");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const fetchWeatherData = async (loc) => {
    setError("")
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=8c3e231ee78246f5a96210446240707&q=${loc}&days=5&aqi=no&alerts=no`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Could not fetch data. Please check the city name or try again.");
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (searchValue) {
      setLocation(searchValue);
      e.target.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-5">
          <div className="flex items-center gap-2">
            <img src={ImgLogo} alt="Logo" className="w-20" />
            <div>
              <h1 className="text-xl font-bold">Weather</h1>
              <p className="text-sm text-gray-400">Tagline goes here</p>
            </div>
          </div>
          <nav className="flex gap-6 cursor-pointer text-gray-400">
            <a href="#" className="hover:text-white">
              Home
            </a>
          
          </nav>
        </div>
      </header>

    
      <main
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${ImgBg})`,
        }}
      >
        <div className="bg-black bg-opacity-60 py-10">
          <div className="container mx-auto px-5">
         
            <form
              onSubmit={handleSearch}
              className="flex justify-center items-center gap-3 mb-10"
            >
              <input
                type="text"
                name="search"
                placeholder="Find your location..."
                className="w-full max-w-lg p-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer px-5 py-3 rounded-lg text-white hover:bg-blue-700"
              >
                Find
              </button>
            </form>

           
            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : weatherData ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-bold">
                    {weatherData.location.name}
                  </h2>
                  <img
                    src={weatherData.current.condition.icon}
                    alt="Current Weather"
                    className="mx-auto w-20"
                  />
                  <p className="text-3xl font-bold">
                    {weatherData.current.temp_c}°C
                  </p>
                  <p>{weatherData.current.condition.text}</p>
                </div>

           
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {weatherData.forecast.forecastday.map((day, index) => {
                    const dayName = new Date(day.date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                      }
                    );
                    const formattedDate = new Date(day.date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                      }
                    );

                    return (
                      <div
                        key={index}
                        className="bg-gray-800 p-5 rounded-lg text-center"
                      >
                        <h2 className="text-lg font-bold text-gray-300">
                          {dayName}
                        </h2>
                        <p className="text-gray-400">{formattedDate}</p>
                        <div className="mt-4">
                          <img
                            src={`https:${day.day.condition.icon}`}
                            alt="Weather Icon"
                            className="w-16 mx-auto"
                          />
                          <p className="text-4xl font-bold">
                            {day.day.avgtemp_c}°C
                          </p>
                          <p className="text-gray-400">
                            {day.day.condition.text}
                          </p>
                        </div>
                        <div className="flex justify-around mt-4 text-gray-400">
                          <div>
                            <p>Max Temp</p>
                            <p>{day.day.maxtemp_c}°C</p>
                          </div>
                          <div>
                            <p>Min Temp</p>
                            <p>{day.day.mintemp_c}°C</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="h-screen flex items-center justify-center">
                <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
        </div>
      </main>

   
      <footer className="mt-10 bg-gray-800 bg-opacity-70 py-10">
        <div className="lg:w-4/5 mx-auto lg:flex items-center gap-6">
     
          <div className="lg:w-2/3 relative">
            <input
              type="text"
              placeholder="Enter your email to subscribe..."
              className="bg-gray-700 px-6 py-4 text-white rounded-full w-full focus:outline-none"
            />
            <button className="bg-blue-600 px-7 py-3 rounded-full text-white absolute top-1/2 transform -translate-y-1/2 right-2 hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>

        
          <div className="lg:w-1/3 pt-6 lg:pt-0">
            <ul className="flex gap-4 justify-center">
              <li className="w-[40px] h-[40px] hover:text-white hover:bg-blue-600 rounded-full bg-gray-700 text-blue-600 flex justify-center items-center transition">
                <i className="fa-brands fa-facebook text-2xl"></i>
              </li>
              <li className="w-[40px] h-[40px] hover:text-white hover:bg-blue-600 rounded-full bg-gray-700 text-blue-600 flex justify-center items-center transition">
                <i className="fa-brands fa-twitter text-2xl"></i>
              </li>
              <li className="w-[40px] h-[40px] hover:text-white hover:bg-blue-600 rounded-full bg-gray-700 text-blue-600 flex justify-center items-center transition">
                <i className="fa-brands fa-google-plus-g text-2xl"></i>
              </li>
            </ul>
          </div>
        </div>
        <p className="lg:w-4/5 mx-auto text-gray-400 mt-5 text-center">
          Copyright 2024 Company name. Designed by Themezy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default WeatherApp;
