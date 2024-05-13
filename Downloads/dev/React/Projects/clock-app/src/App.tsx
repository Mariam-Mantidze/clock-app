import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  const [userData, setUserData] = useState();

  async function getUserApi() {
    const response = await fetch(
      "https://api.ipbase.com/v2/info?apikey=ipb_live_RuJUq8aElXhV36LrxSpqdL6ITyQRCsilClMc3XuH&ip=1.1.1.1"
    );
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getUserApi();
  }, []);

  return <GlobalStyles></GlobalStyles>;
}

export default App;
