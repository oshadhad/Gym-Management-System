import AgentSidebar from "@/Components/Agent/AgentSidebar/Index";
import AgentHeader from "@/Components/Agent/Header/Index";
import FlashAlerts from "@/Components/elements/alerts/FlashAlerts";
import { Head, usePage } from "@inertiajs/react";
import { ReactNode } from "react";

export default function Authenticated({
    children,
    bRoutes,
    header,
    title,
}: {
    children: ReactNode;
    bRoutes: any;
    header?: any;
    title:string;
}) {
    const pageProps = usePage().props;
    const { user }: any = pageProps.auth;
    const date = new Date();
    return (
        <>
            <Head title={title} />
            <div className={" min-h-[100vh] h-full scroll-smooth bg-slate-100"}>
                <AgentHeader bRoutes={bRoutes} user={user} />
                <div className="relative h-full pb-10 lg:mt-[65px]">
                    <AgentSidebar user={user} />
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
               
            </div>
            <FlashAlerts flash={pageProps.flash} />
        </>
    );
}
