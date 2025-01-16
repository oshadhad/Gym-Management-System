import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard() {
     const bRoutes = [
         {
             name: "Dashboard",
             hasArrow: true,
             link: route("ag.dashboard"),
         },
     ];

    return (
        <AdminLayout bRoutes={bRoutes} title="Dashboard">
            <div className=""></div>
        </AdminLayout>
    );
}
