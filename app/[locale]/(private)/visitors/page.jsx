import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { VisitorComp } from "./VisitorComp";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import initTranslations from "@/app/i18n";

export default async function Visitors({ params: { locale } }) {
	const { t } = await initTranslations(locale, ["common"]);

	const session = await auth();
	if (!session?.user || !session?.user?.email) return null;

	const visitors = await sql`WITH community_id_query AS (
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
	const visitorsRut = visitors.rows.map((visitor) => ({
		label: visitor.rut,
		id: visitor.id,
	}));
	const visitorsName = visitors.rows.map((visitor) => ({
		label: visitor.name,
		id: visitor.id,
	}));

	return (
		<Container maxWidth="lg" sx={{ mt: 2, flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid xs={12} sx={{ my: 2 }}>
					<Typography variant="h4" color="text.secondary" align="center">
						{t("visitors.title")}
					</Typography>

					<VisitorComp visitorsRut={visitorsRut} visitorsName={visitorsName} />
				</Grid>
				<Grid xs={12}>
					<Link href="#">
						<Button
							variant="outlined"
							color="secondary"
							sx={{
								width: "100%",
								textAlign: "center",
								p: 2,
							}}
						>
							<Typography variant="h4">{t("visitors.scan_id")}</Typography>
						</Button>
					</Link>
				</Grid>
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
