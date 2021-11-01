import { NextSeo } from "next-seo"
import { BtcDollarPrice } from "../components/BtcDollarPrice"
import { Dashboard } from "../templates/Dashboard"
import { useState } from "react"
import { format } from "date-fns"
import DataTable, { TableColumn } from "react-data-table-component"

type WalletDataType = {
  status: string
  data: {
    address: string
    txs: {
      value: string
      confirmations: number
      time: number
    }[]
  }
}

type DataRow = {
  value: string
  confirmations: number
  time: number
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Valor",
    selector: (row) => row.value,
    sortable: true,
  },
  {
    name: "Confirmações",
    selector: (row) => row.confirmations,
    sortable: true,
  },
  {
    name: "Data",
    selector: (row) => row.time,
    cell: (row) => format(new Date(row.time * 1000), "dd/MM/yyyy"),
    sortable: true,
  },
]

const paginationComponentOptions = {
  rowsPerPageText: "Resultados por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [walletInput, setWalletInput] = useState("")
  const [walletData, setWalletData] = useState<WalletDataType | null>(null)

  async function handleWalletSubmit(e: React.SyntheticEvent) {
    if (walletInput.length > 0) {
      e.preventDefault()
      setLoading(true)
      try {
        const walletData = await fetch(
          `https://chain.so/api/v2/get_tx_received/btc/${walletInput}`
        ).then((response) => response.json())
        setLoading(false)
        setWalletData(walletData)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <NextSeo
        title="Bitcoin"
        description="See the Bitcoin price in real time and wallet transactions"
      />
      <Dashboard>
        <main className="flex-1">
          <div className="py-6">
            {/* Page Header */}
            <div className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text">
                Bitcoin
              </h1>
              <BtcDollarPrice />
            </div>
            {/* End of Page Header */}
            {/* Start of Page Body */}
            <div className="max-w-7xl flex flex-col mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-8 border-t border-gray-300 mt-4">
                <form
                  className="flex flex-col sm:flex-row items-end"
                  onSubmit={handleWalletSubmit}
                >
                  <div className="w-full sm:w-1/4 sm:mr-8 space-y-4 sm:space-y-0">
                    <label
                      className="text-lg font-bold text-gray-600"
                      htmlFor=""
                    >
                      1. Endereço da Carteira
                    </label>
                    <input
                      onChange={(e) => setWalletInput(e.currentTarget.value)}
                      type="text"
                      className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto mt-4 sm:mt-0">
                    Ver Transações
                  </button>
                </form>
              </div>

              <div>
                <p>{loading ? "Carregando..." : ""}</p>
                {walletData ? (
                  walletData.status === "fail" ? (
                    "Endereço não encontrado"
                  ) : (
                    <h2 className="text-lg text-gray-600">
                      Histórico de Transações do endereço{" "}
                      {walletData.data.address}
                    </h2>
                  )
                ) : (
                  ""
                )}
                {walletData ? (
                  <DataTable
                    columns={columns}
                    data={walletData.data.txs}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    noDataComponent="Não há dados para serem exibidos"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* End of Page Body */}
          </div>
        </main>
      </Dashboard>
    </>
  )
}
