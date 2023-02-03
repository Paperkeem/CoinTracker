import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom/atoms";
import styled from "styled-components";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export default function Footer() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <StToggle onClick={toggleDarkAtom}>
      {isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
    </StToggle>
  );
}

const StToggle = styled.button`
  position: fixed;
  top: 90%;
  left: 3%;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  svg {
    line-height: 40px;
    margin-top: 4px;
    font-size: 1.2rem;
  }
  svg:hover {
    transform: rotate(0.2turn);
    transition: 0.3s ease-out;
  }
`;
