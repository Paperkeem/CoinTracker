import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { isLoading, data: coins } = useQuery<ICoin[]>(["coins"], fetchCoins);

  return (
    <StContainer>
      <StHeader>
        <StTitle>Coin Tracker</StTitle>
      </StHeader>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <StCoinList>
          {coins?.slice(0, 100).map((coin) => (
            <StCoin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <StImage
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </StCoin>
          ))}
        </StCoinList>
      )}
    </StContainer>
  );
}

const StContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const StHeader = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const StCoinList = styled.ul``;

const StCoin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 7px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const StImage = styled.img`
  margin-right: 10px;
  width: 35px;
  height: 35px;
`;
