import Dashboard_component from "@components/dashboard_component";
import { logger } from "@/logger"
import { auth } from "@/auth";
/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/
//TODO: this could be a single component instead of a function calling another component
export default async function ConciergeDashboard(){
    const session =  await auth();
    logger.info(`User with email '${session?.user?.email}' has opened the dashboard.`);

    //  Here is a welcome message and a logout button displayed.
    return <Dashboard_component />;
};
