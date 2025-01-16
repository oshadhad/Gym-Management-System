import AgentLayout from "@/Layouts/AgentLayout";
import { Head } from '@inertiajs/react';

export default function Dashboard() {
     const bRoutes = [
         {
             name: "Dashboard",
             hasArrow: true,
             link: route("ag.dashboard"),
         },
     ];

    return (
        <AgentLayout bRoutes={bRoutes} title="Dashboard">
            <div className=""></div>
        </AgentLayout>
    );
}
