import { PrimaryButton } from "@/Components/elements/buttons/PrimaryButton";
import AgentLayout from "@/Layouts/AgentLayout";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function CreateAttendances({ auth, users }: any) {
    const { post, data, setData } = useForm({
        user_id: auth.user.id, // Default to the authenticated user
        day: new Date().toISOString().slice(0, 10), // Today's date
        opt_in: null,
        opt_out: null,
    });

    const formatDateTime = (date: Date) => {
        return date.toISOString().slice(0, 19).replace('T', ' '); // Converts to MySQL format
    };

    const handleOptIn = () => {
        if (!data.opt_in) {
            const currentTime = formatDateTime(new Date());
            setData("opt_in", currentTime);
        }
    };

    const handleOptOut = () => {
        if (!data.opt_out) {
            const currentTime = formatDateTime(new Date());
            setData("opt_out", currentTime);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("ag.attendances.store"));
    };

    const bRoutes = [
        {
            name: "Dashboard",
            hasArrow: true,
            link: route("ag.dashboard"),
        },
        {
            name: "Attendances",
            hasArrow: true,
            link: route("ag.attendances.index"),
        },
        {
            name: "Create",
            hasArrow: true,
            link: route("ag.attendances.create"),
        },
    ];

    return (
        <AgentLayout bRoutes={bRoutes} title={"Create Attendances"}>
            <form onSubmit={handleSubmit} className="mt-4 bg-white rounded-lg max-w-fit">
                <div className="py-4">
                    <h1>
                        <div className="pl-8">
                            <span className="text-lg font-semibold leading-6 text-gray-900">Hello, </span>
                            <span className="font-[700]">{auth.user.name}</span>
                        </div>
                    </h1>
                </div>
                <div className="text-center">
                    <div className="border-t border-gray-100">
                        <dl className="text-left divide-y divide-gray-100">
                            {/* Day */}
                            <div className="px-4 py-4 sm:grid-cols-3 sm:gap-4 sm:grid">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Today</dt>
                                <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <span className="flex-grow">{data.day}</span>
                                </dd>
                            </div>
                            {/* Opt-In */}
                            <div className="items-center px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Opt In Time</dt>
                                <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.opt_in ? (
                                        <span>{data.opt_in}</span>
                                    ) : (
                                        <PrimaryButton onClick={handleOptIn}>Opt In</PrimaryButton>
                                    )}
                                </dd>
                            </div>
                            {/* Opt Out */}
                            <div className="items-center px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Opt Out Time</dt>
                                <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.opt_out ? (
                                        <span>{data.opt_out}</span>
                                    ) : (
                                        data.opt_in && (
                                            <PrimaryButton onClick={handleOptOut}>Opt Out</PrimaryButton>
                                        )
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="mt-4">
                    <PrimaryButton type="submit">Submit Attendance</PrimaryButton>
                </div>
            </form>
        </AgentLayout>
    );
}
