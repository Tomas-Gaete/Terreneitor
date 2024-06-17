import ConciergeDelivery from "./ConciergeDelivery";
import ResidentDelivery from "./ResidentDelivery";
import { auth } from "@/auth";

export default async function Delivery() {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    if (session.user.role === "admin" || session.user.role === "concierge") {
        return <ConciergeDelivery />;
    } else {
        return <ResidentDelivery />;
    }
}   
