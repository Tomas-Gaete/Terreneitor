import ConciergeDashboard from "./ConciergeDashboard";
import ResidentDashboard from "./ResidentDashboard";
import { auth } from "@/auth";

export default async function Dashboard() {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    if (session.user.role === "admin" || session.user.role === "concierge") {
        return <ConciergeDashboard />;
    } else {
        return <ResidentDashboard />;
    }
}