import AdminSidebar from "@/Components/Admin/AdminSidebar/Index";
import AdminHeader from "@/Components/Admin/Header/Index";
import FlashAlerts from "@/Components/elements/alerts/FlashAlerts";
import { Head, usePage } from "@inertiajs/react";
import { ReactNode } from "react";

export default function AdminLayout({
    children,
    bRoutes,
    header,
    title,
}: {
    children: ReactNode;
    bRoutes: any;
    header?: any;
    title: string;
}) {
    const pageProps = usePage().props;
    const { user }: any = pageProps.auth;
    const date = new Date();
    return (
        <>
            <Head title={title} />
            <div className={" min-h-[100vh] h-full scroll-smooth bg-slate-100"}>
                <AdminHeader bRoutes={bRoutes} user={user} />
                <div className="relative h-full pb-10 lg:mt-[65px]">
                    <AdminSidebar user={user} />
                    <div className="flex flex-1 flex-col lg:pl-[260px] h-full min-h-[80vh]">
                        {header && (
                            <div className="px-8 border-b border-slate-300 bg-white py-4">
                                {header}
                            </div>
                        )}
                        <main className="container mx-auto flex-1 p-8 lg:p-6">
                            <h1 className="font-[800] text-2xl">{title}</h1>
                            {children}
                        </main>
                        {/* <Footer /> */}
                    </div>
                </div>
                <div className="container mx-auto text-center pt-[100px] pb-4 lg:pl-[240px]">
                    <p className="text-sm text-gray-800 space-x-2 text-center">
                        <span>
                            Copyright &copy; {date.getFullYear()}, HRM. All
                            rights reserved,
                        </span>
                        <span>
                            Developed By{" "}
                            <a
                                target="_blank"
                                href="https://axcertro.com?ref=HRM"
                                className="font-[800]"
                            >
                                Axcertro
                            </a>{" "}
                            <span>With ❤️</span>
                        </span>
                    </p>
                </div>
            </div>
            <FlashAlerts flash={pageProps.flash} />
        </>
    );
}
