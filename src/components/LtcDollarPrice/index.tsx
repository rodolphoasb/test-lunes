import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function LtcDollarPrice() {
  const { data, error } = useSWR(
    "https://chain.so/api/v2/get_price/ltc/USD",
    fetcher
  )

  if (error) return <div>Falha ao carregar</div>
  if (!data) return <div>Carregando...</div>
  const price = data.data.prices.filter(
    (obj: { exchange: string }) => obj.exchange === "bitfinex"
  )[0].price
  // render data
  return (
    <p className="text-xl">
      Cotação:{" "}
      {new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(price)}
    </p>
  )
}
