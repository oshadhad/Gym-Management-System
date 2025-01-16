import React, { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import AgentLayout from "@/Layouts/AgentLayout";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/elements/inputs/SelectInput";

const statusOptions = ["Pending", "Active", "Done", "Decline", "Reactivate", "Cancel"];

interface MaintenanceData {
    machine_id: string;
    title: string;
    description: string;
    startDate: string;
    status: string;
}

export default function CreateMaintenance({ machines }: { machines: any[] }) {
    const { data, setData, post, errors } = useForm<MaintenanceData>({
        machine_id: "",
        title: "",
        description: "",
        startDate: "",
        status: "",
    });

    // Transform machines into options for SelectInput
    const machineOptions = machines.map((machine) => ({
        label: machine.machineName, // Use machineName for display
        value: machine.id, // Use machineName as the value
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as keyof MaintenanceData, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("ag.maintenances.store"));
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
        {
            name: "Create",
            hasArrow: true,
            link: route("ag.maintenances.create"),
        },
    ];
    console.log(machines);

    return (
        <AgentLayout bRoutes={bRoutes} title={"Create Maintenances"}>
            <div className="py-8">
                <div className="w-full max-w-md sm:px-4 lg:px-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                            <div className="mb-4">
                                <label htmlFor="machines">
                                    Select Machine<span className="text-red-500">*</span>
                                </label>
                                <SelectInput
                                    options={machineOptions}  // passing machine id as the value
                                    selectedOption={machineOptions.find((option) => option.value === data.machine_id)}
                                    setData={(value) => setData("machine_id", value)}  // setting "machine_id"
                                    placeholder="Select a machine"
                                    isClearable
                                />
                                <InputError message={errors.machine_id} />
                            </div>
                            <div>
                                <label htmlFor="title">
                                    Title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    placeholder="Enter Title"
                                    required
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div>
                                <label htmlFor="description">
                                    Description<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    placeholder="Enter Description"
                                    required
                                    className="block w-full mt-1 border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-[5.625rem] rounded-[0.625rem]"
                                ></textarea>
                                <InputError message={errors.description} />
                            </div>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="startDate">
                                        Start Date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={data.startDate}
                                        onChange={handleChange}
                                        required
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    />
                                    <InputError message={errors.startDate} />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="status">
                                        Status<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={handleChange}
                                        required
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Select Status
                                        </option>
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
