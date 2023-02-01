import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchingInfo, fetchingPrice } from "../api/api";
import { infoData, PriceData } from "../type/type";

export default function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);

  const { isLoading, data: info } = useQuery<infoData>(["info", coinId], () =>
    fetchingInfo(coinId)
  );
  const { data: price } = useQuery<PriceData>(["price", coinId], () =>
    fetchingPrice(coinId)
  );

  return (
    <StContainer>
      <StHeader>
        <StTitle>{info?.name}</StTitle>
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
      <Tabs>
        <Tab isActive={!!chartMatch}>
          <Link to="chart">Chart</Link>
        </Tab>
        <Tab isActive={!!priceMatch}>
          <Link to="price">Price</Link>
        </Tab>
      </Tabs>

      <Outlet context={{ coinId }} />
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
  line-height: 1.2rem;
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

const Tabs = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div<{ isActive: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  border-radius: 7px;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 400;
  a {
    padding: 10px 85px;
    display: block;
  }
`;
