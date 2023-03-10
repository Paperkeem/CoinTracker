import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PriceData } from "../type/type";
import { fetchingPrice } from "../api/api";

export default function usePrice(coinId: string) {
  const priceQuery = useQuery<PriceData>(
    ["price", coinId],
    () => fetchingPrice(coinId),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return { priceQuery };
}
