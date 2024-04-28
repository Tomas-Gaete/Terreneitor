import { Button } from "@mui/material";
import { signOut } from "@/auth";
import LanguageChanger from "@/app/components/LanguageChanger";
import { Lan } from "@mui/icons-material";
import Dashboard_component from "@/app/components/dashboard_component";

/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/

const Dashboard = () => {
    return(
        //  Here is a welcome message and a logout button displayed.
        <div>
            <Dashboard_component />


        </div>
    );
};

export default Dashboard;