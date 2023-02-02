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

  const priceList = [
    {
      text: "30m",
      value: +USD.percent_change_30m,
    },
    {
      text: "1h",
      value: +USD.percent_change_1h,
    },
    {
      text: "6h",
      value: +USD.percent_change_6h,
    },
    {
      text: "12h",
      value: +USD.percent_change_12h,
    },
    {
      text: "24h",
      value: +USD.percent_change_24h,
    },
    {
      text: "30d",
      value: +USD.percent_change_30d,
    },
  ];
  console.log(priceList);
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
        {priceList.map((item) => (
          <StockWrap>
            <span>From {item.text} ago</span>
            <Result isUp={item.value > 0 ? true : false}>
              <span>{item.value}%</span>
              {item.value >= 0 ? <AiOutlineRise /> : <AiOutlineFall />}
            </Result>
          </StockWrap>
        ))}
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
