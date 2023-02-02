import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { PriceData } from "../type/type";
import { fetchingPrice } from "../api/api";

export default function usePrice(coinId: string) {
  console.log("hello");

  const priceQuery = useQuery<PriceData>(
    ["price", coinId],
    () => fetchingPrice(coinId),
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!coinId,
    }
  );

  return { priceQuery };
}
