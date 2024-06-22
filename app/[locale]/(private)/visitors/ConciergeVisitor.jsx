import { Box, Button, Container, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { VisitorComp } from "@components/VisitorComp";

import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@vercel/postgres";
import initTranslations from "@/app/i18n";
import { logger } from "@/logger";

export default async function ConciergeVisitors({ locale }) {
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
    let frequentVisitors;

    const client = await db.connect();

	try {
		visitors = await client.sql`
        SELECT 
            id,
            rut, 
            firstname ||' '|| lastname AS name
        FROM visitor
        WHERE community_id = (SELECT community_id FROM user_info WHERE id = ${session.user.id})
      `;

		visitorsRut = visitors.rows.map((visitor) => ({
			label: visitor.rut,
			id: visitor.id,
		}));
		visitorsName = visitors.rows.map((visitor) => ({
			label: visitor.name,
			id: visitor.id,
		}));

        residences = await client.sql`
        SELECT
            id,
            community_address
        FROM 
            residence
        WHERE
            community_id = (SELECT community_id FROM user_info WHERE id = ${session.user.id})
        `;
        residences = residences.rows.map((residence) => ({
            label: residence.community_address,
            id: residence.id
        }));


        visitorLicensePlates = await client.sql`
        SELECT
            vv.id,
            vv.license_plate
        FROM
            visitor_vehicle vv
        JOIN
            visitor v ON v.id = vv.visitor_id
        WHERE
            v.community_id = (SELECT community_id FROM user_info WHERE id = ${session.user.id})
        `;
        visitorLicensePlates = visitorLicensePlates.rows.map((visitor) => ({
            label: visitor.license_plate,
            id: visitor.id
        }));

        frequentVisitors = await client.sql`
        SELECT
            fv.visitor_id,
            fv.residence_id
        FROM
            frequent_visitor fv
        inner join
                residence r on fv.residence_id = r.id
        WHERE
            r.community_id = (SELECT community_id FROM user_info WHERE id = ${session.user.id})
        `;
        frequentVisitors = frequentVisitors.rows.map((visitor) => ({
            visitor_id: visitor.visitor_id,
            residence_id: visitor.residence_id
        }));


	} catch (error) {
        alert = "Error loading visitors."
		visitors = [];
		visitorsRut = [];
		visitorsName = [];
        residences = [];
        visitorLicensePlates = [];
        frequentVisitors = [];
	} finally {
		client.release();
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
                    visitorLicense={visitorLicensePlates}
                    frequentVisitors={frequentVisitors}
                />

				<Grid item="true" xs={12} md={6} sx={{ height: "100%" }}>
					<Link
						href="/visitors/frequent-visitor"
						style={{ textDecoration: "none" }}
					>
						<Button
							variant="outlined"
							color="primary"
							sx={{
								width: "100%",
								textAlign: "center",
								display: "flex",
								flexDirection: "column",
								border: "1px solid",
								textTransform: "none",
							}}
						>
							<Typography variant="h4" color="primary">
								{t("visitors.frequent_visitors")}
							</Typography>
							<Typography variant="p" color="secondary">
								{t("visitors.frequent_visitors_description")}
							</Typography>
						</Button>
					</Link>
				</Grid>

				<Grid item="true" xs={12} md={6} sx={{ height: "100%" }}>
				<Link
						href="/parking"
						style={{ textDecoration: "none" }}
					>
					<Button
						variant="outlined"
						color="primary"
						sx={{
							width: "100%",
							textAlign: "center",
							display: "flex",
							flexDirection: "column",
							border: "1px solid",
							textTransform: "none",
						}}
					>
						<Typography variant="h4" color="primary">
							Parking
						</Typography>
						<Typography variant="p" color="secondary">
							Manage parking for visitors
						</Typography>
					</Button>
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}
