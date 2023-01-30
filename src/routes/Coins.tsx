import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const coin = [
{
id: "btc-bitcoin",
name: "Bitcoin",
symbol: "BTC",
rank: 1,
is_new: false,
is_active: true,
type: "coin",
},
{
id: "eth-ethereum",
name: "Ethereum",
symbol: "ETH",
rank: 2,
is_new: false,
is_active: true,
type: "coin",
},
{
id: "hex-hex",
name: "HEX",
symbol: "HEX",
rank: 3,
is_new: false,
is_active: true,
type: "token",
},
]

export default function Coins() {
  return (
    <StContainer>
      <StHeader>
        <StTitle>Coin Tracker</StTitle>
      </StHeader>

      <StCoinList>
        {coin.map((coin) => (
          <StCoin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </StCoin>
        ))}
      </StCoinList>
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

const StCoinList = styled.ul``;

const StCoin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 7px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const StTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.accentColor};
`

