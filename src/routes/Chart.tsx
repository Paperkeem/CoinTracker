import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api/api";
import ApexChart from "react-apexcharts";
import LoadingSpinner from "../components/LoadingSpinner";

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string | number;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  const { coinId } = useOutletContext<Record<string, string>>();
  const { isLoading, data: chart } = useQuery(
    ["chart", coinId],
    () => fetchCoinHistory(coinId),
    { onError: (error) => console.log(error) }
  );

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "close price",
              data:
                chart?.map((price: IHistory) => Number(price.close)) ||
                Array(21).fill(0),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
              toolbar: { show: false },
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              type: "datetime",
              categories: chart.map((price: IHistory) =>
                new Date(price.time_close * 1000).toUTCString().slice(0, 16)
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#54a0ff"], stops: [0, 100] },
            },
            colors: ["#10ac84"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(1)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
