import { useState, useEffect } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { createContext } from "react";
import MainView from "./components/MainView";

export const userContext = createContext({});

function App() {
  const [userData, setUserData] = useState({});

  function formatTime(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  async function getUserApi() {
    //time data
    const timeResponse = await fetch("http://worldtimeapi.org/api/ip");
    const timeData = await timeResponse.json();

    const currentTime = formatTime(timeData.datetime);
    const currentTimeZone = timeData.timezone;
    const currentDayOfYear = timeData.day_of_year;
    const currentDayOfWeek = timeData.day_of_week;
    const weekNumber = timeData.week_number;
    const userIp = timeData.client_ip;

    function findTimeOfDay() {
      const convertedTime = parseInt(currentTime);
      if (convertedTime > 5 && convertedTime < 12) {
        return "morning";
      } else if (convertedTime > 12 && convertedTime < 18) {
        return "afternoong";
      } else {
        return "evening";
      }
    }

    const timeOfDay = findTimeOfDay();

    //country data
    const countryResponse = await fetch(
      `https://api.ipbase.com/v2/info?apikey=ipb_live_RuJUq8aElXhV36LrxSpqdL6ITyQRCsilClMc3XuH&ip=${userIp}`
    );
    const countryData = await countryResponse.json();
    const timeZoneCode = countryData.data.timezone.code;
    const countryName = countryData.data.location.country.name;
    const cityName = countryData.data.location.city.name;
    const countryAbbreviation = countryData.data.location.country.ioc;

    // quote data

    const quoteResponse = await fetch("https://api.quotable.io/random");
    const quoteData = await quoteResponse.json();
    const randomQuote = quoteData.content;
    const quoteAuthor = quoteData.author;

    setUserData({
      currentTime,
      currentTimeZone,
      currentDayOfYear,
      currentDayOfWeek,
      weekNumber,
      timeOfDay,
      timeZoneCode,
      countryName,
      cityName,
      countryAbbreviation,
      randomQuote,
      quoteAuthor,
    });
  }

  useEffect(() => {
    getUserApi();
  }, []);

  return (
    <userContext.Provider value={userData}>
      <GlobalStyles />
      <MainView />
    </userContext.Provider>
  );
}

export default App;
