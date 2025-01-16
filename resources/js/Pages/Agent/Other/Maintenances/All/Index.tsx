import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';
import MasterTable, { TableBody, TableTd } from '@/Components/elements/tables/masterTable';

import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';
import { IoPencil } from 'react-icons/io5';
import { PrimaryLink } from '@/Components/elements/buttons/PrimaryButton';
import ConfirmButton from '@/Components/elements/buttons/ConfirmButton';

export default function MachineDashboard({
    maintenances,
    filters,
    machines,
}: {
    maintenances: any;
    filters: any;
    machines: any[];
}) {
    const tableColumns = [
        { label: "" },
        { label: "Machine Name", sortField: "machine_id", sortable: true },
        { label: "Title", sortField: "title", sortable: true },
        { label: "Description", sortField: "description", sortable: true },
        { label: "Start Date", sortField: "startDate", sortable: true },
        { label: "Status", sortField: "status", sortable: true },
        { label: "Created At", sortField: "created_at", sortable: true },
    ];

    const search = {
        placeholder: "Search Here",
    };

    const createLink = {
        url: route("ag.maintenances.create"),
        label: "Create",
    };

    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("ag.dashboard"),
        },
        {
            name: "Maintenances",
            hasArrow: true,
            link: route("ag.maintenances.index"),
        },
    ];

    const pageProps = usePage().props;

    return (
        <AgentLayout bRoutes={bRoutes} title={"Maintenances"}>
            <div className="py-6">
                <FlashAlerts flash={pageProps.flash} />
                <div>
                    <MasterTable
                        createLink={createLink}
                        tableColumns={tableColumns}
                        url={route("ag.maintenances.index")}
                        filters={filters}
                        search={search}
                        links={maintenances.links}
                    >
                        {maintenances.data?.map((maintenance: any) => {
                            const machine = machines.find(
                                (m: any) => m.id === maintenance.machine_id
                            ); // Find the related machine using machine_id

                            return (
                                <TableBody
                                    key={maintenance.id}
                                    buttons={
                                        <div className="flex space-x-4">
                                            <PrimaryLink
                                                href={route(
                                                    "ag.maintenances.edit",
                                                    maintenance.id
                                                )}
                                            >
                                                <span className="flex items-center space-x-2">
                                                    <IoPencil className="hover:text-primary" />
                                                    <span>Edit</span>
                                                </span>
                                            </PrimaryLink>
                                            <ConfirmButton
                                                url={route(
                                                    "ag.maintenances.destroy",
                                                    maintenance.id
                                                )}
                                                label="Delete"
                                            />
                                        </div>
                                    }
                                >
                                    <TableTd>{machine?.machineName || "Unknown"}</TableTd>
                                    <TableTd>{maintenance.title}</TableTd>
                                    <TableTd>{maintenance.description}</TableTd>
                                    <TableTd>{maintenance.startDate}</TableTd>
                                    <TableTd>{maintenance.status}</TableTd>
                                    <TableTd>{maintenance.created_at_human}</TableTd>
                                </TableBody>
                            );
                        })}
                    </MasterTable>
                </div>
            </div>
        </AgentLayout>
    );
}
