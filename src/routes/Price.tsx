import React from "react";
import { useOutletContext } from "react-router-dom";
import { PriceData } from "../type/type";
import styled from "styled-components";
import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";

type CProps = {
  coinId?: string;
  price: PriceData;
};

export default function Price() {
  const { price }: CProps = useOutletContext();

  const {
    quotes: { USD },
  } = price;

  console.log(price);
  return (
    <StContainer>
      <StPriceWrap>
        <FlexView>
          <span>
            {USD.ath_date.slice(0, 10)} {USD.ath_date.slice(11, -1)}
          </span>
          <span>최고가 달성</span>
        </FlexView>
        <TitleSpan>${USD.ath_price.toFixed(2)}</TitleSpan>
      </StPriceWrap>

      <StockContainer>
        <StockWrap>
          <span>From 30m ago</span>
          <Result isUp={+USD.percent_change_30m > 0 ? true : false}>
            <span>{USD.percent_change_30m.toFixed(1)}%</span>
            {+USD.percent_change_30m >= 0 ? (
              <AiOutlineRise />
            ) : (
              <AiOutlineFall />
            )}
          </Result>
        </StockWrap>
        <StockWrap>
          <span>From 1h ago</span>
          <Result isUp={+USD.percent_change_1h > 0 ? true : false}>
            <span>{USD.percent_change_1h.toFixed(1)}%</span>
            {+USD.percent_change_1h >= 0 ? (
              <AiOutlineRise />
            ) : (
              <AiOutlineFall />
            )}
          </Result>
        </StockWrap>
        <StockWrap>
          <span>From 6h ago</span>
          <Result isUp={+USD.percent_change_6h > 0 ? true : false}>
            <span>{USD.percent_change_6h.toFixed(1)}%</span>
            {+USD.percent_change_6h >= 0 ? (
              <AiOutlineRise />
            ) : (
              <AiOutlineFall />
            )}
          </Result>
        </StockWrap>
        <StockWrap>
          <span>From 12h ago</span>
          <Result isUp={+USD.percent_change_12h > 0 ? true : false}>
            <span>{USD.percent_change_12h.toFixed(1)}%</span>
            {+USD.percent_change_12h >= 0 ? (
              <AiOutlineRise />
            ) : (
              <AiOutlineFall />
            )}
          </Result>
        </StockWrap>
        <StockWrap>
          <span>From 24h ago</span>
          <Result isUp={+USD.percent_change_24h > 0 ? true : false}>
            <span>{USD.percent_change_24h.toFixed(1)}%</span>
            {+USD.percent_change_24h >= 0 ? (
              <AiOutlineRise />
            ) : (
              <AiOutlineFall />
            )}
          </Result>
        </StockWrap>
        <StockWrap>
          <span>From 30d ago</span>
          <Result isUp={+USD.percent_change_30d > 0 ? true : false}>
            <span>{USD.percent_change_30d.toFixed(1)}%</span>
            {+USD.percent_change_30d >= 0 ? (
              <AiOutlineRise />
            ) : (
              <AiOutlineFall />
            )}
          </Result>
        </StockWrap>
      </StockContainer>
    </StContainer>
  );
}

const StContainer = styled.div`
  max-width: 480px;
  margin: 10px auto;
`;

const StPriceWrap = styled.div`
  padding: 20px 20px;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexView = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const TitleSpan = styled.span`
  font-size: 1.2rem;
`;

const StockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
`;

const StockWrap = styled.div`
  padding: 20px 20px;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
`;

const Result = styled.div<{ isUp: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 1.7rem;
  margin-top: 10px;
  color: ${(props) => (props.isUp ? "red" : "blue")};
`;
