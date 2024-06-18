import ConciergeDashboard from "./ConciergeDashboard";
import ResidentDashboard from "./ResidentDashboard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();//no se si se crea un session con google
    if (!session) {
        redirect("/login");
    }
    if (session.user.role === "admin" || session.user.role === "concierge") {//fix o manejar caso de usuarios de google sin user en db!
        return <ConciergeDashboard />;
    } else {
        return <ResidentDashboard />;
    }
}