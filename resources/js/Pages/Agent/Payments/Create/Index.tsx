import SelectInput from "@/Components/elements/inputs/SelectInput";
import InputError from "@/Components/InputError";
import AgentLayout from "@/Layouts/AgentLayout";
import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";

interface PaymentData {
    user_id: string;
    type: string;
    subs: string;
    amount: string;
}

interface User {
    id: string;
    name: string;
}

interface Props {
    users: User[];
}

export default function CreatePayment({ users }: Props) {
    const { data, setData, post, errors } = useForm<PaymentData>({
        user_id: "",
        type: "",
        subs: "",
        amount: "",
    });

    const [isSubscriptionFee, setIsSubscriptionFee] = useState<boolean>(false);

    // Convert users data to options for the SelectInput component
    const userOptions = users.map((user) => ({
        label: user.name,
        value: user.id,
    }));

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
        post(route("ag.payments.store"));
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
            name: "Create",
            hasArrow: true,
            link: route("ag.payments.create"),
        },
    ];

    return (
        <AgentLayout bRoutes={bRoutes} title={"Create Payments"}>
            <div className="py-8">
                <div className="w-full max-w-md sm:px-4 lg:px-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                            {/* User Selection */}
                            <div className="mb-4">
                                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
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

                            {/* Payment Type Selection */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Select Type<span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.type === "Subscription Fee"}
                                            onChange={() => handleTypeChange("Subscription Fee")}
                                            className="w-6 h-6 border-gray-300 rounded shadow-sm text-primary focus:ring-primary"
                                        />
                                        <span className="ml-2">Subscription Fee</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.type === "Registration Fee"}
                                            onChange={() => handleTypeChange("Registration Fee")}
                                            className="w-6 h-6 border-gray-300 rounded shadow-sm text-primary focus:ring-primary"
                                        />
                                        <span className="ml-2">Registration Fee</span>
                                    </label>
                                </div>
                                <InputError message={errors.type} />
                            </div>

                            {/* Subscription Type Dropdown */}
                            {isSubscriptionFee && (
                                <div>
                                    <label htmlFor="subs" className="block text-sm font-medium text-gray-700">
                                        Subscription Type
                                    </label>
                                    <select
                                        name="subs"
                                        id="subs"
                                        value={data.subs}
                                        onChange={(e) => setData("subs", e.target.value)}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                    >
                                        <option value="">Select Subscription Type</option>
                                        <option value="Annual">Annual</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                    <InputError message={errors.subs} />
                                </div>
                            )}

                            {/* Amount Input */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    Amount<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={data.amount}
                                    onChange={(e) => setData("amount", e.target.value)}
                                    step="0.01"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                    placeholder="Enter amount"
                                />
                                <InputError message={errors.amount} />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="px-4 py-2 font-semibold text-white border border-transparent rounded bg-primary hover:bg-primary-dark"
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
