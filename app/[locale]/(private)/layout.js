import ResponsiveAppBar from "@components/ResponsiveAppBar";
import {auth } from "@/auth";
import { redirect } from 'next/navigation'

export const metadata = {
	title: "Terreneitor Private",
	description: "EL COCHE MAS PODEROSO QUE HA EXISTIDO",
};

export default async function PrivateLayout({ children }) {
	
    const session = await auth();
    if (!session) {
        redirect("/login");
        //TODO: Maybe show a loading screen and log this
    }

	return (
		<>
			<section>
				<ResponsiveAppBar />
				{children}
			</section>
		</>
	);
}
