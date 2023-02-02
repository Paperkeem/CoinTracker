const BASE_URL = "https://api.coinpaprika.com";

export function fetchCoins() {
  return fetch(`${BASE_URL}/v1/coins`).then((res) => {
    if (!res.ok) throw new Error("Error!");
    return res.json();
  });
}

export const fetchingInfo = async (coinId?: string) => {
  const infoData = await (await fetch(`${BASE_URL}/v1/coins/${coinId}`)).json();
  return infoData;
};

export const fetchingPrice = async (coinId?: string) => {
  const priceData = await (
    await fetch(`${BASE_URL}/v1/tickers/${coinId}`)
  ).json();
  return priceData;
};

export const fetchCoinHistory = async (coinId?: string) => {
  const res = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const json = res.json();
  return json;
};
