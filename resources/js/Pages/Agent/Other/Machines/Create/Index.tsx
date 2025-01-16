import FileDropzone from "@/Components/elements/FileDropzone/FileDropzone";
import InputError from "@/Components/InputError";
import AgentLayout from "@/Layouts/AgentLayout";
import { useForm } from "@inertiajs/react";


const statusOptions = ["Running", "Inactive"];

interface MachineData {
    machineName: string;
    description: string;
    EstDate: string;
    photo: File | null;
    status: string;
}

export default function CreateMachine() {
    const { data, setData, post, errors } = useForm<MachineData>({
        machineName: "",
        description: "",
        EstDate: "",
        photo: null,
        status: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name } = e.target;

        if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
            setData(name as keyof MachineData, e.target.files[0]);
        } else {
            setData(name as keyof MachineData, (e.target as HTMLInputElement | HTMLSelectElement).value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("ag.machines.store"));
    };

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
        {
            name: "Create",
            hasArrow: true,
            link: route("ag.machines.create"),
        },
    ];

    return (
        <AgentLayout bRoutes={bRoutes} title={"Create Machine"}>
            <div className="py-8">
                <div className="w-full max-w-md sm:px-4 lg:px-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                            <div className="mb-4">
                            </div>
                            <ol className="space-y-4 list-decimal list-inside">
                                <div>
                                    <label htmlFor="machineName">Machine Name<span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="machineName"
                                        name="machineName"
                                        value={data.machineName}
                                        onChange={handleChange}
                                        placeholder="Enter Machine Name"
                                        required
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    />
                                    <InputError message={errors.machineName} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description<span className="text-red-500">*</span></label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        placeholder="Enter Description"
                                        required
                                        className="block w-full mt-1 border-gray-300  shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm h-[5.625rem] rounded-[0.625rem]"
                                    ></textarea>
                                    <InputError message={errors.description} />
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="EstDate">Establish Date<span className="text-red-500">*</span></label>
                                        <input
                                            type="date"
                                            id="EstDate"
                                            name="EstDate"
                                            value={data.EstDate}
                                            onChange={handleChange}
                                            required
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        />
                                        <InputError message={errors.EstDate} />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="status">Status<span className="text-red-500">*</span></label>
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
                                <FileDropzone
                                    multiple={false} // Single file mode
                                    onChange={(files) => setData('photo', files[0] || null)} // Update 'photo' in form data
                                    value={data.photo ? [data.photo] : []} // Pass the photo as an array if available
                                    error={errors.photo} // Show validation error for 'photo'
                                />
                                <InputError message={errors.photo} />


                                <button
                                    type="submit"
                                    className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
                                >
                                    Save
                                </button>
                            </ol>
                        </form>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
