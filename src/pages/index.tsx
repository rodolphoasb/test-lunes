import { Fragment, useState } from "react"
import Link from "next/link"
import { Dialog, Transition } from "@headlessui/react"
import { HomeIcon, MenuIcon, UsersIcon, XIcon } from "@heroicons/react/outline"
import type { NextPage } from "next"
import useSWR from "swr"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const navigation = [
  { name: "Bitcoin", href: "/", icon: "/BTC_Logo.svg", current: true },
  {
    name: "Licoin",
    href: "/litecoin",
    icon: "/litecoin-ltc-logo.svg",
    current: false,
  },
]

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data, error } = useSWR(
    "https://chain.so/api/v2/get_price/btc/USD",
    fetcher
  )

  if (error) return <div>Falha ao carregar</div>
  if (!data) return <div>Carregando...</div>
  const price = data.data.prices.filter(
    (obj: { exchange: string }) => obj.exchange === "bitfinex"
  )[0].price
  // render data
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4 justify-center text-white font-bold text-2xl">
                    <h2>RBravo</h2>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href} passHref>
                        <a
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        ></a>
                        <img className="h-6 w-6 mr-8" src={item.icon} alt="" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 justify-center text-white font-bold text-2xl">
                RBravo
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <img className="h-6 w-6 mr-8" src={item.icon} alt="" />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-yellow-500">
                  Bitcoin
                </h1>
                <p className="text-xl">
                  Cotação:{" "}
                  {new Intl.NumberFormat("en-us", {
                    style: "currency",
                    currency: "USD",
                  }).format(price)}
                </p>
              </div>
              <div className="max-w-7xl flex flex-col mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-8 border-t border-gray-300 mt-4">
                  <form className="flex items-end">
                    <div className="w-1/4 mr-8">
                      <label
                        className="text-lg font-bold text-gray-600"
                        htmlFor=""
                      >
                        1. Endereço da Carteira
                      </label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded">
                      Ver Transações
                    </button>
                  </form>
                </div>

                <div>
                  <h2 className="text-lg text-gray-600">
                    Histórico de Transações
                  </h2>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Home
