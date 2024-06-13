import { logger } from "@/logger"
import { auth } from "@/auth";
import {Deliverycomponent} from "@/app/components/deliver_component.js";

/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/

export default async function Delivery ({ params: { locale } }){
    const session =  await auth();
    if (!session?.user || !session?.user?.email) return null;

    //const { t } = await initTranslations(locale, ["common"]);
    logger.info(`User with email '${session?.user?.email}' has opened the dashboard.`);

    //  Here is a welcome message and a logout button displayed.
    return ( 
        <div>
            <Deliverycomponent />
        </div>
    );
};

