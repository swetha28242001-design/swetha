import React, { useEffect, useState } from "react";
import "./App.css";
import "../public/weather.png"

const App = () => {
  const apiKey = "086601fab5da6add87de1d058484674f";
  const [search, setSearch] = useState("chennai");
  const [weather, setWeather] = useState(null);
  const weatherIcons = {
    "01d": "/sun.png",
    "01n": "/sun.png",
    "02d": "/cloudy.png",
    "02n": "/cloudy.png",
    "10d": "/rain.png",
    "10n": "/rain.png",
    "13n": "/snow.png",
    "13d": "/snow.png",
    "09d": "/shower.png",
    "09n": "/shower.png",
  };

  const handleClick = async () => {
    if (search.trim() === "") {
      alert("please enter the city name...");
      return;
    }
    setSearch("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("city not found.please enter a valid city name....");

        return;
      }

      setWeather(data);
      setSearch("");
    } catch (error) {
      console.error("error fetching weather:", error);
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="bg-indigo-500 sm:px-8 md:px-16 lg:px-24 p-2 min-h-screen flex flex-col justify-center items-center ">
      <div className="max-w-sm  bg-indigo-700 w-full p-5 rounded-md ring-fuchsia-800">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-400 pl-1.5 font-extrabold rounded-md m-1 p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src="/search.png"
            alt="search"
            className="bg-gray-400 pl-1.5 m-1 p-2 max-w-[10%] rounded-md"
            onClick={handleClick}
          />
        </div>
        <div className="justify-center items-center pl-[30%] m-4">
          <h1 className=" flex flex-col font-bold text-5xl">
            {weather?.main?.temp !== undefined
              ? `${Math.floor(weather.main.temp)}`
              : ""}
            °C{" "}
          </h1>
          <h2 className="text-2xl ">{weather?.name}</h2>
          <img
            src={weatherIcons[weather?.weather[0]?.icon] || "/cloudy.png"}
            alt="cloud"
            className="max-w-[40%]  "
          />
        </div>
        <div className="flex  gap-[55%]  ">
          <img src="/humidity.png" alt="humidity" className="max-w-[20%]" />

          <img src="/wind.png" alt="wind" className="max-w-[20%] " />
        </div>
        <div className="flex  gap-[55%]">
          <span>Humidity {weather?.main?.humidity}%</span>
          <span>Wind Speed {weather?.wind?.speed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default App;
