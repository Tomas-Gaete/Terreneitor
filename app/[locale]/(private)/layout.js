import ResponsiveAppBar from "@components/ResponsiveAppBar";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
import { sql } from "@vercel/postgres";

// * This will show the title and description of the page. for dashboard page in this case
export const metadata = {
	title: "Terreneitor Private",
	description: "EL COCHE MAS PODEROSO QUE HA EXISTIDO",
};


// * This function will redirect to the login page if the user is not logged in, doing this by a token. If the user is logged in, it will show the responsive app bar and the children of the page.
export default async function PrivateLayout({ children }) {
	
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const communityResult = await sql`SELECT c.name FROM community c 
        JOIN user_info u ON c.id = u.community_id 
        WHERE u.id = ${session?.user?.id}`;

	return (
		<>
			<section>
				<ResponsiveAppBar role={session?.user?.role} community={communityResult.rows[0].name}/>
				{children}
			</section>
		</>
	);
}
