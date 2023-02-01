export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((res) =>
    res.json()
  );
}

export const fetchingInfo = async (coinId?: string) => {
  const infoData = await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  ).json();
  return infoData;
};

export const fetchingPrice = async (coinId?: string) => {
  const priceData = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
  return priceData;
};
