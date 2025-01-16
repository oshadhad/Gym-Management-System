import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex relative min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <img
                src="/assets/images/sidebar/bgs/sidebar-1.png"
                className="-z-10 absolute inset-0 w-full h-full object-cover bg-center bg-cover"
                alt=""
            />
            <div className="-z-10 absolute inset-0 bg-gradient-to-b from-black to-red-950/90 backdrop-blur-[2px]" />
            <div className="">
                <div className="flex justify-center">
                    <Link href="/">
                        <img
                            src="/assets/images/logo.png"
                            className="h-20 w-[auto] fill-current text-gray-500"
                        />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
