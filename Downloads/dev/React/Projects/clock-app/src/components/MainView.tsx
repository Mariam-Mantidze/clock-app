import styled from "styled-components";
import { userContext } from "../App";
import { useContext } from "react";

export default function MainView() {
  const newContext = useContext(userContext);
  console.log(newContext);

  return <Main></Main>;
}

const Main = styled.main`
  position: relative;
  background: url("assets/mobile/bg-image-daytime.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100dvh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;
