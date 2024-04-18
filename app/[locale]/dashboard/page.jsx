import { Button } from "@mui/material";
import { signOut } from "@/auth";

const Dashboard = () => {
    return (
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