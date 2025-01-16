import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';
import MasterTable, { TableBody, TableTd } from '@/Components/elements/tables/masterTable';

import { IoPencil } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';
import FlashAlerts from '@/Components/elements/alerts/FlashAlerts';
import ConfirmButton from '@/Components/elements/buttons/ConfirmButton';
import { PrimaryLink } from '@/Components/elements/buttons/PrimaryButton';


export default function UserDashboard({ users, filters }: { users: any, filters: any }) {


    const tableColumns = [
        { label: "" },
        { label: "Name", sortField: "first_name", sortable: true },
        { label: "Email", sortField: "email", sortable: true },
        { label: "Created At", sortField: "created_at", sortable: true },
    ];

    const search = {
        placeholder: "Search Here",
    };

    const createLink = {
        url: route("ag.users.create"),
        label: "Create",
    }

    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("ag.dashboard"),
        },
        {
            name: "Users",
            hasArrow: true,
            link: route("ag.users.index"),
        },
    ];


    const pageProps = usePage().props;

    console.log(users);
    return (
        <AgentLayout bRoutes={bRoutes} title={"Users"}>
            <div className="py-6">
                <FlashAlerts flash={pageProps.flash} />
                <div>
                    <MasterTable
                        createLink={createLink}
                        tableColumns={tableColumns}
                        url={route("ag.users.index")}
                        filters={filters}
                        search={search}
                        links={users.links}
                    >
                        {users.data?.map((user: any) => (
                            <TableBody
                                key={user.id}
                                buttons={
                                    <div className="flex space-x-4">
                                        <PrimaryLink
                                            href={route(
                                                "ag.users.edit",
                                                user.id
                                            )}
                                        >
                                            <span className="flex items-center space-x-2">
                                                <IoPencil className="hover:text-primary" />
                                                <span>Edit</span>
                                            </span>
                                        </PrimaryLink>
                                        <ConfirmButton
                                            url={route('ag.users.destroy', user.id)}
                                            label='Delete'
                                        />
                                    </div>
                                }
                            >
                                <TableTd>{user.name}</TableTd>
                                <TableTd>{user.email}</TableTd>
                                <TableTd>{user.created_at_human}</TableTd>
                            </TableBody>
                        ))}
                    </MasterTable>
                </div>
            </div>
        </AgentLayout>
    );
}


