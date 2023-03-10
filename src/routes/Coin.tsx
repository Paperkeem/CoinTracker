import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchingInfo, fetchingPrice } from "../api/api";
import { infoData, PriceData } from "../type/type";
import { Helmet } from "react-helmet";
import { AiOutlineUnorderedList } from "react-icons/ai";
import usePrice from "../hooks/usePrice";

export default function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);

  const { isLoading, data: info } = useQuery<infoData>(
    ["info", coinId],
    () => fetchingInfo(coinId),
    { staleTime: 1000 * 60 * 5 }
  );

  const {
    priceQuery: { data: price },
  } = usePrice(coinId!);

  const navigate = useNavigate();
  const handleGoList = () => navigate("/");

  return (
    <StContainer>
      <Helmet>
        <title>{isLoading ? "Loding..." : info?.name}</title>
      </Helmet>

      <ListIcon>
        <AiOutlineUnorderedList onClick={handleGoList} />
      </ListIcon>

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
              <span>Price</span>
              <span>{price?.quotes.USD.price.toFixed(2)}</span>
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

      <Outlet context={{ coinId, price }} />
    </StContainer>
  );
}
const StOverview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.15);
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
  margin: 10px auto;
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
  background-color: rgba(0, 0, 0, 0.15);
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

const ListIcon = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3rem;
    cursor: pointer;
  }
  span {
    margin-left: 5px;
    font-size: 1.2rem;
  }
`;
