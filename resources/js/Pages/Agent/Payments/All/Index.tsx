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


export default function UserDashboard({ payments, filters, users }: { payments: any, filters: any, users: any }) {


    const tableColumns = [
        { label: "" },
        { label: "User Name", sortField: "user_id", sortable: true },
        { label: "Type", sortField: "type", sortable: true },
        { label: "Subscription", sortField: "subs", sortable: true },
        { label: "Amount", sortField: "amount", sortable: true },
        { label: "Created At", sortField: "created_at", sortable: true },
    ];

    const search = {
        placeholder: "Search Here",
    };

    const createLink = {
        url: route("ag.payments.create"),
        label: "Create",
    }

    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("ag.dashboard"),
        },
        {
            name: "Payments",
            hasArrow: true,
            link: route("ag.payments.index"),
        },
    ];


    const pageProps = usePage().props;

    return (
        <AgentLayout bRoutes={bRoutes} title={"Payments"}>
            <div className="py-6">
                <FlashAlerts flash={pageProps.flash} />
                <div>
                    <MasterTable
                        createLink={createLink}
                        tableColumns={tableColumns}
                        url={route("ag.payments.create")}
                        filters={filters}
                        search={search}
                        links={payments.links}
                    >
                        {payments.data?.map((payment: any) => {
                            const user = users.find(
                                (u: any) => u.id === payment.user_id);
                            return (
                                <TableBody
                                    key={payment.id}
                                    buttons={
                                        <div className="flex space-x-4">
                                            <PrimaryLink
                                                href={route(
                                                    "ag.payments.edit",
                                                    payment.id
                                                )}
                                            >
                                                <span className="flex items-center space-x-2">
                                                    <IoPencil className="hover:text-primary" />
                                                    <span>Edit</span>
                                                </span>
                                            </PrimaryLink>
                                            <ConfirmButton
                                                url={route('ag.payments.destroy', payment.id)}
                                                label='Delete'
                                            />
                                        </div>
                                    }
                                >
                                    <TableTd>{user?.name || "Unknown"}</TableTd>
                                    <TableTd>{payment.type}</TableTd>
                                    <TableTd>{payment.subs}</TableTd>
                                    <TableTd>{payment.amount}</TableTd>
                                    <TableTd>{payment.created_at_human}</TableTd>
                                </TableBody>
                            );
                        })}
                    </MasterTable>
                </div>
            </div>
        </AgentLayout>
    );
}


