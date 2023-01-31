import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Coin() {
  const { coinId } = useParams();
  const {
    state: { name },
  } = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchingInfo = async () => {
    const infoData = await (
      await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    ).json();
    return infoData;
  };
  const fetchingPrice = async () => {
    const priceData = await (
      await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    ).json();
    return priceData;
  };

  const { isLoading, data: info } = useQuery(["info"], fetchingInfo);
  const { data: price } = useQuery(["price"], fetchingPrice);

  return (
    <StContainer>
      <StHeader>
        <StTitle>
          {!!name ? name : isLoading ? <LoadingSpinner /> : info?.name}
        </StTitle>
      </StHeader>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <StOverview>
            <OverviewItem>
              <span>Lank</span>
              <span>{info?.rank}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Symbol</span>
              <span>{info?.symbol}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Symbol</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </StOverview>
          <Description>{info?.description}</Description>

          <StOverview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Max Supply</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </StOverview>
        </>
      )}
    </StContainer>
  );
}
const StOverview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  padding: 10px 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  text-align: center;
`;

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
