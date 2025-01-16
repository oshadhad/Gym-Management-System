import SelectInput from "@/Components/elements/inputs/SelectInput";
import InputError from "@/Components/InputError";
import AgentLayout from "@/Layouts/AgentLayout";
import { useForm } from "@inertiajs/inertia-react";
import React, { useState, useEffect } from "react";

interface PaymentData {
    user_id: string;
    type: string;
    subs: string;
    amount: string;
}

export default function EditPayment({ users, payments }: { users: any[]; payments: PaymentData }) {
    const { data, setData, patch, errors } = useForm<PaymentData>({
        user_id: payments.user_id || "",
        type: payments.type || "",
        subs: payments.subs || "",
        amount: payments.amount || "",
    });

    const [isSubscriptionFee, setIsSubscriptionFee] = useState<boolean>(data.type === "Subscription Fee");

    const userOptions = users.map((user) => ({
        label: user.name,
        value: user.id,
    }));

    useEffect(() => {
        setIsSubscriptionFee(data.type === "Subscription Fee");
    }, [data.type]);

    const handleTypeChange = (type: string) => {
        if (data.type === type) {
            setData("type", "");
            setIsSubscriptionFee(false);
        } else {
            setData("type", type);
            setIsSubscriptionFee(type === "Subscription Fee");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("ag.payments.update", payments.id));
    };

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
        {
            name: "Edit",
            hasArrow: true,
            link: route("ag.payments.edit", payments.id),
        },

    ];

    return (
        <AgentLayout bRoutes={bRoutes} title={"Edit Payment"}>
            <div className="py-8">
                <div className="w-full max-w-md sm:px-4 lg:px-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                            <div className="mb-4">
                                <label htmlFor="user_id">
                                    Select User<span className="text-red-500">*</span>
                                </label>
                                <SelectInput
                                    options={userOptions}
                                    selectedOption={userOptions.find((option) => option.value === data.user_id)}
                                    setData={(value) => setData("user_id", value)}
                                    placeholder="Select user"
                                    isClearable
                                />
                                <InputError message={errors.user_id} />
                            </div>

                            <div>
                                <label htmlFor="type">
                                    Select Type<span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.type === "Subscription Fee"}
                                            onChange={() => handleTypeChange("Subscription Fee")}
                                            className="w-6 h-6 border-gray-300 rounded shadow-sm text-primary outline-transparent"
                                        />
                                        <span className="ml-2">Subscription Fee</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.type === "Registration Fee"}
                                            onChange={() => handleTypeChange("Registration Fee")}
                                            className="w-6 h-6 border-gray-300 rounded shadow-sm text-primary outline-transparent"
                                        />
                                        <span className="ml-2">Registration Fee</span>
                                    </label>
                                </div>
                                <InputError message={errors.type} />
                            </div>

                            {isSubscriptionFee && (
                                <div>
                                    <label htmlFor="subs">
                                        Subscription Type<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="subs"
                                        id="subs"
                                        value={data.subs}
                                        onChange={(e) => setData("subs", e.target.value)}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    >
                                        <option value="">Select Subscription Type</option>
                                        <option value="Annual">Annual</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                    <InputError message={errors.subs} />
                                </div>
                            )}

                            <div>
                                <label htmlFor="amount">
                                    Amount<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={data.amount}
                                    onChange={(e) => setData("amount", e.target.value)}
                                    step="0.01"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    placeholder="Enter amount"
                                />
                                <InputError message={errors.amount} />
                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
