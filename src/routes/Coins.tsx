import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

export default function Coins() {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <StContainer>
      <StHeader>
        <StTitle>Coin Tracker</StTitle>
      </StHeader>

      {loading ? (
        <LoadingSection />
      ) : (
        <StCoinList>
          {coins?.map((coin) => (
            <StCoin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
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
const LoadingSection = styled.div`
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 64px;
	height: 64px;
	margin-top: -32px;
	margin-left: -32px;
	border-radius: 50%;
	border: 5px solid transparent;
	border-top-color: ${(props) => props.theme.accentColor};
	animation: loading 0.8s ease infinite;

	@keyframes loading {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
