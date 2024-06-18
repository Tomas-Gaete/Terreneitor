import { Button } from "@mui/material";
import { signIn } from "@/auth.js"
import { signOut } from "@/auth";
import LanguageChanger from "@/app/components/LanguageChanger";
import { Lan } from "@mui/icons-material";
import Dashboard_component from "@/app/components/dashboard_component";
import {Signin} from "@/app/components/Google_component.js";
/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/

const Google = () => {
    return(
        //  Here is a welcome message and a logout button displayed.
        <div>
                <Signin/>
        </div>
    );
};

export default Google;