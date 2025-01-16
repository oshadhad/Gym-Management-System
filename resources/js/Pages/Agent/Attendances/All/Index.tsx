import { PrimaryLink } from "@/Components/elements/buttons/PrimaryButton";
import AgentLayout from "@/Layouts/AgentLayout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function AttendancesDashboard({ attendances }: any) {
    // Breadcrumbs
    const bRoutes = [
        { name: "Dashboard", hasArrow: true, link: route("ag.dashboard") },
        { name: "Attendances", hasArrow: true, link: route("ag.attendances.index") },
    ];

    const pageProps = usePage().props;
    const { users } = pageProps; // Pass the user list from the backend

    // Generate current month days (e.g., 1 - 31)
    const getMonthDays = () => {
        const days = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // December (0-based index)

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day); // Add day numbers
        }
        return days;
    };

    const monthDays = getMonthDays();

    // Helper function to format time dynamically
    const formatTime = (dateString: string | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    return (
        <AgentLayout bRoutes={bRoutes} title={"Attendances Dashboard"}>
            <div className="flex justify-end mb-4">
                <PrimaryLink href={route("ag.attendances.create")}>
                    Mark Attendance
                </PrimaryLink>
            </div>

            {/* Attendance Table */}
            <div className="overflow-auto">
                <table className="min-w-full text-center border border-collapse border-gray-300 table-fixed">
                    {/* Table Header */}
                    <thead className="sticky top-0 bg-gray-200">
                        <tr>
                            <th className="w-32 px-4 py-2 border border-gray-300">User</th>
                            {monthDays.map((day) => (
                                <th
                                    key={day}
                                    className="px-2 py-2 text-sm border border-gray-300"
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((user: any) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    {/* User Name */}
                                    <td className="px-4 py-2 font-medium border border-gray-300">
                                        {user.name}
                                    </td>

                                    {/* Attendance Data */}
                                    {monthDays.map((day) => {
                                        // Find attendance for this user and day
                                        const attendance = attendances.find(
                                            (a: any) =>
                                                a.user_id === user.id &&
                                                new Date(a.day).getDate() === day
                                        );

                                        // Format opt_in and opt_out dynamically
                                        const optIn = attendance
                                            ? formatTime(attendance.opt_in)
                                            : null;
                                        const optOut = attendance
                                            ? formatTime(attendance.opt_out)
                                            : null;

                                        return (
                                            <td
                                                key={day}
                                                className="px-2 py-2 border border-gray-300"
                                            >
                                                {attendance ? (
                                                    <>
                                                        <div className="text-xs text-green-500">
                                                            In: {optIn || "-"}
                                                        </div>
                                                        <div className="text-xs text-red-500">
                                                            Out: {optOut || "-"}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-400">-</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={monthDays.length + 1}
                                    className="px-4 py-2 text-center border"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AgentLayout>
    );
}
