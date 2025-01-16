import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';
import MasterTable, { TableBody, TableTd } from '@/Components/elements/tables/masterTable';

import { IoPencil } from 'react-icons/io5';
import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';
import ConfirmButton from '@/Components/elements/buttons/ConfirmButton';
import { PrimaryLink } from '@/Components/elements/buttons/PrimaryButton';


export default function MachineDashboard({ machines, filters }: { machines: any, filters: any }) {


    const tableColumns = [
        { label: "" },
        { label: "Photo", sortField: "photo", sortable: true },
        { label: "Machine Name", sortField: "machineName", sortable: true },
        { label: "Establish Date", sortField: "EstDate", sortable: true },
        { label: "Status", sortField: "status", sortable: true },
        { label: "Created At", sortField: "created_at", sortable: true },
    ];

    const search = {
        placeholder: "Search Here",
    };

    const createLink = {
        url: route("ag.machines.create"),
        label: "Create",
    }

    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("ag.dashboard"),
        },
        {
            name: "Machines",
            hasArrow: true,
            link: route("ag.machines.index"),
        },
    ];


    const pageProps = usePage().props;

    return (
        <AgentLayout bRoutes={bRoutes} title={"Machines"}>
            <div className="py-6">
                <FlashAlerts flash={pageProps.flash} />
                <div>
                    <MasterTable
                        createLink={createLink}
                        tableColumns={tableColumns}
                        url={route("ag.machines.index")}
                        filters={filters}
                        search={search}
                        links={machines.links}
                    >
                        {machines.data?.map((machine: any) => (
                            <TableBody
                                key={machine.id}
                                buttons={
                                    <div className="flex space-x-4">
                                        <PrimaryLink
                                            href={route(
                                                "ag.machines.edit",
                                                machine.id
                                            )}
                                        >
                                            <span className="flex items-center space-x-2">
                                                <IoPencil className="hover:text-primary" />
                                                <span>Edit</span>
                                            </span>
                                        </PrimaryLink>
                                        <ConfirmButton
                                            url={route('ag.machines.destroy', machine.id)}
                                            label='Delete'
                                        />
                                    </div>
                                }
                            >
                                {/* Render Image */}
                                <TableTd>
                                    {machine.photo ? (
                                        <img
                                            src={`/storage/${machine.photo}`}
                                            alt={machine.machineName}
                                            className="object-cover w-16 h-16 rounded"
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </TableTd>


                                <TableTd>{machine.machineName}</TableTd>
                                <TableTd>{machine.EstDate}</TableTd>
                                <TableTd>{machine.status}</TableTd>
                                <TableTd>{machine.created_at_human}</TableTd>
                            </TableBody>
                        ))}
                    </MasterTable>
                </div>
            </div>
        </AgentLayout>
    );
}


