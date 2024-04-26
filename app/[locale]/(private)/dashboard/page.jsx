import { Button } from "@mui/material";
import { signOut } from "@/auth";

/*
    * This is the page the user sees upon logging in. This dashboard will be private, meaning it will only be visible once logged in with email and password.
*/

const Dashboard = () => {
    return(
        //  Here is a welcome message and a logout button displayed.
        <div>
            <h1>Welcome to the Dashboard!</h1>
            <form action={async ()=>{
                "use server";
                await signOut({ redirectTo: "/en/login"});
            }}>
            <Button variant="outlined" type="submit" color="primary">Click me!</Button>
            </form>
        </div>
    );
};

export default Dashboard;