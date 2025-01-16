import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/react";
import { Fragment, ReactNode, useState } from "react";
import { agentNavigationLinks } from "@/lib/SideNavLinks";
import { canContinue, canContinueArray } from "@/lib/utility";
import NavMulti from "../AgentSidebar/partials/NavMulti";
import NavSingle from "../AgentSidebar/partials/NavSingle";
import NavSeparator from "../AgentSidebar/partials/NavSeparator";
import NavTitle from "../AgentSidebar/partials/NavTitle";
import Breadcrumbs from "@/Components/elements/breadCumbs/BreadCumbs";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const AgentHeader = ({
    user,
    header,
    bRoutes,
}: {
    user: any;
    header?: ReactNode;
    bRoutes: any;
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[101] lg:hidden"
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
                        <div className="fixed inset-0 bg-opacity-75 bg-slate-900" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-50 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-slate-900">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="w-6 h-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <nav
                                    className="mt-5 h-full flex-shrink-0  overflow-y-auto"
                                    aria-label="Sidebar"
                                >
                                    <div className="pt-2">
                                        {agentNavigationLinks.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <div key={index}>
                                                        {/* Multi Nav */}
                                                        {item.link &&
                                                            item.children
                                                                ?.length > 0 &&
                                                            canContinueArray(
                                                                item.permissions,
                                                                user
                                                            ) && (
                                                                <NavMulti
                                                                    name={
                                                                        item.name
                                                                    }
                                                                    startWith={
                                                                        item.startWith
                                                                    }
                                                                    icon={
                                                                        item.img
                                                                    }
                                                                    children={
                                                                        item.children
                                                                    }
                                                                />
                                                            )}

                                                        {/* Single nav */}
                                                        {item.link &&
                                                            !item.children &&
                                                            canContinueArray(
                                                                item.permissions,
                                                                user
                                                            ) && (
                                                                <NavSingle
                                                                    name={
                                                                        item.name
                                                                    }
                                                                    startWith={
                                                                        item.startWith
                                                                    }
                                                                    routeName={route(
                                                                        item.route
                                                                    )}
                                                                    img={
                                                                        item.img
                                                                    }
                                                                    isSpecial={
                                                                        item.isSpecial
                                                                    }
                                                                />
                                                            )}
                                                        {/* Nav Seperator */}
                                                        {!item.link &&
                                                            item.border &&
                                                            canContinueArray(
                                                                item.permissions,
                                                                user
                                                            ) && (
                                                                <NavSeparator
                                                                    name={
                                                                        item.name
                                                                    }
                                                                />
                                                            )}
                                                        {/* Nav Title */}
                                                        {!item.link &&
                                                            !item.border && (
                                                                <NavTitle
                                                                    name={
                                                                        item.name
                                                                    }
                                                                />
                                                            )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="relative mt-14 md:mt-0 md:fixed bg-black md:top-0 md:left-0 right-0 z-50 shadow">
                <header className="flex z-50 w-full flex-shrink-0">
                    <div className="grid w-full lg:flex lg:flex-1 lg:justify-between lg:mx-auto lg:max-w-full lg:pr-8">
                        <div className="fixed top-0 left-0 right-0 z-50 w-full py-3 bg-black lg:relative lg:top-0 lg:flex lg:flex-1 lg:divide-x lg:divide-red-950/60 border-b border-red-950/60">
                            <div className="relative w-full px-4 lg:pl-6 justify-between lg:w-[260px] flex lg:justify-left">
                                <img
                                    className="h-[40px] object-contain self-center"
                                    src={"/assets/images/logo.png?z=1"}
                                    alt="site logo"
                                />
                                <button
                                    type="button"
                                    className=" focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="sr-only">
                                        Open sidebar
                                    </span>
                                    <Bars3CenterLeftIcon
                                        className="self-center w-6 h-6 text-slate-200"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="hidden pl-8 lg:flex lg:ml-0">
                                <Breadcrumbs routes={bRoutes} />
                            </div>
                        </div>
                        <div className="flex justify-between px-4 py-4 lg:ml-4 lg:py-0 lg:px-0 lg:bg-transparent lg:items-center md:ml-6">
                            <div className="flex lg:hidden">
                                <Breadcrumbs routes={bRoutes} />
                            </div>
                            <div className="flex">
                                <Menu
                                    as="div"
                                    className="relative self-center ml-3"
                                >
                                    <div>
                                        <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-transparent group">
                                            <span className="ml-3 text-sm font-medium text-gray-700">
                                                <span className="sr-only">
                                                    Open user menu for{" "}
                                                </span>
                                                <img
                                                    className="object-cover w-10 h-10 rounded-full"
                                                    src={user.avatar_url}
                                                />
                                            </span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dropdown-menu ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={route("logout")}
                                                        method={"post"}
                                                        as="button"
                                                        type="button"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block w-full px-4 py-2 text-left text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Logout
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};
export default AgentHeader;
