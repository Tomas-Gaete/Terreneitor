import { Box, Button, Container, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { VisitorComp } from "./VisitorComp";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import initTranslations from "@/app/i18n";
import { logger } from "@/logger";

export default async function Visitors({ params: { locale } }) {
	const { t } = await initTranslations(locale, ["common"]);

	const session = await auth();
	logger.info(`User with the email:'${session?.user?.email}' has opened the visitors page.`);
	if (!session?.user || !session?.user?.email) return null;

	let visitors;
	let visitorsRut;
	let visitorsName;
    let visitorLicensePlates;
    let alert;
    let residences;

	try {
		visitors = await sql`WITH community_id_query AS (
            SELECT community_id
            FROM user_info
            WHERE email = ${session.user.email}
        )
        SELECT 
            id,
            rut, 
            firstname ||' '|| lastname AS name
        FROM visitor
        WHERE community_id = (SELECT community_id FROM community_id_query)
      `;

		visitorsRut = visitors.rows.map((visitor) => ({
			label: visitor.rut,
			id: visitor.id,
		}));
		visitorsName = visitors.rows.map((visitor) => ({
			label: visitor.name,
			id: visitor.id,
		}));

        residences = await sql`WITH community_id_query AS (
        SELECT community_id
        FROM user_info
        WHERE email = ${session.user.email})
        SELECT
            id,
            community_address
        FROM 
            residence
        WHERE
            community_id = (SELECT community_id FROM community_id_query)
        `;
        residences = residences.rows.map((residence) => ({
            label: residence.community_address,
            id: residence.id
        }));


        visitorLicensePlates = await sql`WITH community_id_query AS (
        SELECT community_id
        FROM user_info
        WHERE email = ${session.user.email})
        SELECT
            vv.id,
            vv.license_plate
        FROM
            visitor_vehicle vv
        JOIN
            visitor v ON v.id = vv.visitor_id
        WHERE
            v.community_id = (SELECT community_id FROM community_id_query)
        `;
        visitorLicensePlates = visitorLicensePlates.rows.map((visitor) => ({
            label: visitor.license_plate,
            id: visitor.id
        }));

	} catch (error) {
		visitors = [];
		visitorsRut = [];
		visitorsName = [];
        residences = [];
        visitorLicensePlates = [];
	}
    logger.debug(`(${visitors?.fields?.length ?? 0}) visitors loaded.`);
	return (
		<Container maxWidth="lg" sx={{ mt: 2, flexGrow: 1 }}>
            {alert && <Alert severity="error">{alert}</Alert>}
			<Grid container spacing={2} height="100%">
				<VisitorComp
                    visitorsRut={visitorsRut}
                    visitorsName={visitorsName}
                    residences={residences}
                    visitorLicense={visitorLicensePlates}/>

				<Grid xs={12} md={6}>
					<Box
						sx={{
							width: "100%",
							border: 0.1,
							borderRadius: 1,
							borderColor: "text.secondary",
							textAlign: "center",
						}}
					>
						<Typography variant="h4" color="text.secondary">
							{t("visitors.frequent_visitors")}
						</Typography>
					</Box>
				</Grid>
				<Grid xs={12} md={6}>
					<Link href="#">
						<Box
							sx={{
								width: "100%",
								border: 0.1,
								borderRadius: 1,
								borderColor: "text.secondary",
								textAlign: "center",
							}}
						>
							<Typography variant="h4" color="text.secondary">
								{t("visitors.parking_space")}
							</Typography>
						</Box>
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}
