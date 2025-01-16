

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { useState } from "react";
import useStateRef from "react-usestateref";
import { useDebouncedCallback } from "use-debounce";
import { PrimaryLink } from "../buttons/PrimaryButton";
import SearchInput from "../inputs/SearchInput";
import Pagination from "@/Components/Shared/Pagination";

export function TableBody({
    key,
    children,
    buttons,
    className,
    edit,
}: {
    key?: any;
    children: any;
    buttons?: any;
    className?: any;
    edit?: boolean;
}) {
    return (
        <Disclosure as="tbody" className=" bg-white w-full" key={key}>
            {({ open }) => (
                <>
                    <tr key={key + "p"} className="">
                        <TableTd width={10}>
                            {edit === false ? (
                                ""
                            ) : (
                                <Disclosure.Button className="w-12 text-gray-900">
                                    <span className="flex items-center">
                                        {open ? (
                                            <ChevronDownIcon
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ChevronRightIcon
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                </Disclosure.Button>
                            )}
                        </TableTd>
                        {children}
                    </tr>
                    <tr key={key + "c"}>
                        <Disclosure.Panel
                            as="td"
                            colSpan={100}
                            className="whitespace-nowrap bg-gray-50 py-4 pl-4 pr-3 sm:pl-6 "
                        >
                            <span className="flex items-center space-x-4">
                                {buttons}
                            </span>
                        </Disclosure.Panel>
                    </tr>
                </>
            )}
        </Disclosure>
    );
}

export function TableTd({
    children,
    width,
    onClick,
}: {
    children: any;
    width?: number;
    onClick?: () => void;
}) {
    return (
        <td
            width={width}
            onClick={onClick}
            className="whitespace-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
        >
            {children}
        </td>
    );
}

export default function MasterTable({
    tableColumns,
    filters,
    url,
    createLink,
    importLink,
    exportLink,
    filterBar = true,
    search,
    links,
    children,
}: {
    tableColumns: any;
    filters: any;
    url: string;
    createLink?: {
        label: string;
        url: string;
    };
    importLink?: {
        label: string;
        url: string;
    };
    exportLink?: {
        label: string;
        url: string;
    };
    search?: {
        placeholder: string;
    };
    filterBar?: boolean;
    links: any;
    children: any;
}) {
    const [searchParam, setSearchParam, searchParamRef] = useStateRef(
        filters.searchParam ?? ""
    );
    const [page, setPage] = useState(filters.page ?? 1);
    const [rowPerPage, setRowPerPage] = useState(filters.perPage ?? 10);
    const [sortBy, setSortBy] = useState(filters.sortBy ?? "name");
    const [sortDirection, setSortDirection] = useState(
        filters.sortDirection ?? "desc"
    );

    const [searchLoader, setSearchLoader] = useState(false);

    function revisitPage() {
        setSearchLoader(true);
        router.get(
            url,
            {
                page: page,
                rowPerPage: rowPerPage,
                sortBy: sortBy,
                sortDirection: sortDirection,
                searchParam: searchParamRef.current,
            },
            {
                replace: true,
                preserveState: true,
                onFinish: () => {
                    setSearchLoader(false);
                },
            }
        );
    }

    const handleOnSort = (column: any, direction: any) => {
        if (column && direction) {
            setSortBy(column);
            setSortDirection(direction);
            revisitPage();
        }
    };

    const debouncedHandleSearch = useDebouncedCallback(
        // function
        (value) => {
            setSearchParam(value);
            setPage(1);
            revisitPage();
        },
        // delay in ms
        300
    );

    const resetSearch = () => {
        setSearchParam("");
        setPage(1);
        revisitPage();
    };

    function tableTh({
        label,
        sortField,
        sortable,
    }: {
        label: string;
        sortField: string;
        sortable: boolean;
    }) {
        return (
            <th
                key={sortField}
                onClick={() =>
                    sortable &&
                    handleOnSort(
                        sortField,
                        sortDirection == "asc" ? "desc" : "asc"
                    )
                }
                scope="col"
                className={
                    (sortable ? " cursor-pointer " : " cursor-default ") +
                    " py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                }
            >
                <div className="flex">
                    {label}
                    {sortBy == sortField && sortDirection == "asc" && (
                        <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="false"
                        />
                    )}
                    {sortBy == sortField && sortDirection == "desc" && (
                        <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="false"
                        />
                    )}
                </div>
            </th>
        );
    }

    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    {/* Filter */}
                    <div className="flex justify-between items-center">
                        <div className="w-4/6 md:w-2/6 flex self-center">
                            {search && (
                                <SearchInput
                                    id="search"
                                    className="shadow-card block !w-full self-center"
                                    isFocused
                                    searchLoader={searchLoader}
                                    defaultValue={searchParamRef.current}
                                    placeholder={search.placeholder}
                                    resetSearch={resetSearch}
                                    autoComplete="search"
                                    onChange={(e) =>
                                        debouncedHandleSearch(e.target.value)
                                    }
                                />
                            )}
                        </div>
                        <div className="flex self-center space-x-4">
                            {createLink && (
                                <PrimaryLink
                                    href={createLink.url}
                                    className="self-center space-x-2 items-center"
                                >
                                    <PlusIcon className="w-4 h-4 text-white" />
                                    <span className="hidden md:block">
                                        {createLink.label}
                                    </span>
                                </PrimaryLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flow-root rounded-lg bg-white shadow">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-x-auto sm:overflow-hidden w-screen sm:w-auto sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {tableColumns.map((column: any) =>
                                            tableTh({
                                                label: column.label,
                                                sortField: column.sortField,
                                                sortable: column.sortable,
                                            })
                                        )}
                                    </tr>
                                </thead>
                                {children}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination links={links} />
        </>
    );
}
