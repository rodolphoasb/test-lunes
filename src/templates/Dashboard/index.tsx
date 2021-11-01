import { Fragment, ReactNode, useState } from "react"
import Link from "next/link"
import { Dialog, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"

type DashboardType = {
  children: ReactNode
}

export function Dashboard({ children }: DashboardType) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
                  <nav className="mt-8 flex-1 px-4 space-y-4">
                    <Link href="/" passHref>
                      <a className="flex text-white font-medium">
                        <img
                          className="h-6 w-6 mr-8 "
                          src="/BTC_Logo.svg"
                          alt="Bitcoin logo"
                        />
                        Bitcoin
                      </a>
                    </Link>
                    <Link href="/litecoin" passHref>
                      <a className="flex text-white font-medium">
                        <img
                          className="h-6 w-6 mr-8"
                          src="/litecoin-ltc-logo.svg"
                          alt="Litecoin logo"
                        />
                        Litecoin
                      </a>
                    </Link>
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
              <nav className="mt-8 flex-1 px-4 space-y-4">
                <Link href="/" passHref>
                  <a className="flex text-white font-medium">
                    <img
                      className="h-6 w-6 mr-8"
                      src="/BTC_Logo.svg"
                      alt="Bitcoin logo"
                    />
                    Bitcoin
                  </a>
                </Link>
                <Link href="/litecoin" passHref>
                  <a className="flex text-white font-medium">
                    <img
                      className="h-6 w-6 mr-8"
                      src="/litecoin-ltc-logo.svg"
                      alt="Litecoin logo"
                    />
                    Litecoin
                  </a>
                </Link>
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
              <span className="sr-only">Abrir Barra Lateral</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
