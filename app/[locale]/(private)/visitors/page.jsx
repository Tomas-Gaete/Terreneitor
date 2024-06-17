import ConciergeVisitors from "./ConciergeVisitor";
import ResidentVisitor from "./ResidentVisitor";
import { auth } from "@/auth"; 

export default async function Visitors({params: {locale}}) {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    if (session.user.role === "admin" ||session.user.role === "concierge") {
        return <ConciergeVisitors locale={locale}/>
    } else {
        return <ResidentVisitor />
    }
}