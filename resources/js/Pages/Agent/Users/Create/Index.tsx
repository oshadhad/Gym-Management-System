import FlashAlerts from "@/Components/elements/alerts/FlashAlerts";
import InputError from "@/Components/InputError";
import AgentLayout from "@/Layouts/AgentLayout";
import { useForm } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/react";
import { error } from "console";

interface UserData{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default function CreateUser(){
    const{data, setData, post, errors} = useForm<UserData>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const{ name, value } = e.target;
        setData(name as keyof UserData, value);
    }

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        post(route('ag.users.store'),{
            data:{...data, role: "user"},
        });
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
        {
            name: "Create",
            hasArrow: true,
            link: route("ag.users.create")
        }
    ];



    const pageProps = usePage().props;

    return(
        <AgentLayout bRoutes={bRoutes} title={"Create User"}>
            <FlashAlerts flash={pageProps.flash} />
           <div className="py-12">
            <div className="w-full max-w-sm sm:px-4 lg:px-6">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold"> Create New User</h2>
                        </div>
                        <ol className="space-y-4 list-decimal list-inside">
                        <div className="flex justify-between space-x-4">
                            <div>
                                <label htmlFor="first_name">First Name<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handlechange}
                                    placeholder="Enter first name"
                                    required
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handlechange}
                                    placeholder="Enter last name"
                                    required
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                                <InputError message={errors.last_name} />
                            </div>
                        </div>
                            <div>
                                <label htmlFor="email">Email<span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handlechange}
                                    placeholder="Enter email "
                                    required
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <label htmlFor="password">Password<span className="text-red-500">*</span></label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handlechange}
                                    placeholder="Enter email "
                                    required
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                                <InputError message={errors.password} />
                            </div>
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
