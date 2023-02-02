import React from "react";
import { useQuery } from "@tanstack/react-query";
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

  const { status, data: chart } = useQuery(
    ["chart", coinId],
    () => fetchCoinHistory(coinId),
    {
      onError: (error) => console.log(error + "쿼리 에러문"),
      retry: 0,
    }
  );

  return (
    <>
      {status === "error" ? (
        <p style={{ textAlign: "center" }}>Can't find chart!</p>
      ) : null}

      {status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data:
                chart?.map((chart: IHistory) => {
                  return {
                    x: new Date(Number(chart.time_close) * 1000).toUTCString(),
                    y: [chart.open, chart.high, chart.low, chart.close],
                  };
                }) || Array(21).fill(0),
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
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#10ac84",
                  downward: "#54a0ff",
                },
              },
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: true },
              type: "datetime",
            },
          }}
        />
      )}
    </>
  );
}
