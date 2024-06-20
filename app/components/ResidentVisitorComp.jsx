"use client";

import {
	Container,
	Typography,
	Grid,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Button,
	Box,
	Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormState } from "react-dom";
import Link from "next/link";
import { removeFrequentVisitor } from "@/app/lib/actions";

export default function ResidentVisitorComp({
	visitorHistory,
	frequentVisitors,
}) {
	const { t } = useTranslation("common", {
		keyPrefix: "resident_visitors",
	});
	return (
		<Container component="main" style={{ flex: 1, padding: "16px" }}>
			<div style={{ textAlign: "center", marginBottom: "32px" }}>
				<Typography variant="h4" component="h1" color="primary" gutterBottom>
					{t("welcome")}
				</Typography>
				<Typography variant="body1" color="secondary">
					{t("subtitle")}
				</Typography>
			</div>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6} lg={6}>
					<Card>
						<CardHeader title={t("visitor_history")} />
						<CardContent
							sx={{
								maxHeight: "50vh",
								overflowY: "scroll",
							}}
						>
							{visitorHistory.length > 0 ? (
								visitorHistory.map((data) => (
									<VisitorItem key={data.id} data={data} />
								))
							) : (
								<Typography variant="body2" color="textSecondary">
									{t("no_visitors")}
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} lg={6}>
					<Card>
						<CardHeader title={t("frequent_visitors")} />
						<CardContent
							sx={{
								maxHeight: "50vh",
								overflowY: "scroll",
							}}
						>
							<Link href="/visitors/frequent-visitor">
								<Button fullWidth variant="outlined" sx={{ mb: 2 }}>
									{t("add_frequent")}
								</Button>
							</Link>
							{frequentVisitors.length > 0 ? (
								frequentVisitors.map((data) => (
									<FrequentVisitorItem key={data.fv_id} data={data} />
								))
							) : (
								<Typography variant="body2" color="textSecondary">
									{t("no_frequent_visitors")}
								</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

function VisitorItem({ data }) {
	const { t } = useTranslation("common", {
		keyPrefix: "resident_visitors",
	});

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				marginBottom: "8px",
			}}
		>
			<Avatar style={{ marginRight: "8px" }} alt={data.name} />
			<div>
				<Typography variant="body1">{data.name}</Typography>
				<Typography variant="body2" color="textSecondary">
					{t("visiting", { date: data.date, time: data.time })}
				</Typography>
			</div>
		</div>
	);
}

function FrequentVisitorItem({ data }) {
	const { t } = useTranslation("common", {
		keyPrefix: "resident_visitors",
	});
	const [error, dispatch] = useFormState(removeFrequentVisitor, undefined);

	if (error === true) return null;
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginBottom: "8px",
				}}
			>
				<Avatar style={{ marginRight: "8px" }} alt={data.visitor_name} />
				<Box
					component="form"
					action={dispatch}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<Box>
						<input
							type="hidden"
							value={data.fv_id}
							name="frequent_visitor_id"
						/>
						<Typography variant="body1">{data.visitor_name}</Typography>
						<Typography variant="body2" color="textSecondary">
							{t("authorized_by", { name: data.resident_name })}
						</Typography>
					</Box>

					<Button type="submit" variant="outlined">
						{t("remove")}
					</Button>
				</Box>
			</div>
			{error && <Alert severity="error">{t(error)}</Alert>}
		</>
	);
}
