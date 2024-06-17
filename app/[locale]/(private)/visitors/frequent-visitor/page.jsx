import ConciergeFrequentVisitor from "./ConciergeFrequentVisitor"
import ResidentFrequentVisitor from "./ResidentFrequentVisitor"
import { auth } from "@/auth";

export default async function Visitors() {

    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "admin" || session.user.role === "concierge") {
        return <ConciergeFrequentVisitor />
    } else {
        return <ResidentFrequentVisitor />
    }
}