import React, { useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Coin() {
  const { coinId } = useParams();
  const { state: { name } } = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchingInfo = async () => {
    const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    return infoData;
  }
  const fetchingPrice = async () => {
    const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    return priceData;
  }
  
  const {isLoading, data: info} = useQuery(['info'], fetchingInfo);
  const { data: price } = useQuery(['price'], fetchingPrice);

  return (
    <StContainer>
      <StHeader>
        <StTitle>
          {name}
        </StTitle>
      </StHeader>

      {isLoading ? <LoadingSpinner /> : null}
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
  color: ${props => props.theme.accentColor};
`