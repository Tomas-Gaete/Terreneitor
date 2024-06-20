"use client";

import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Grid,
	Typography,
	Container,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { useTranslation } from "react-i18next";

export default function ConciergeDashboardComp({
	pendingPackages,
	parkingOccupancy,
	overdueParking,
	latestVisitors,
}) {
	const { t } = useTranslation("translate-dashboard", {
		keyPrefix: "concierge",
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
				<Grid item xs={12} sm={6} lg={4}>
					<Card>
						<CardHeader title={t("pending_packages")} />
						<CardContent
							sx={{
								minHeight: "22vh",
								maxHeight: "50vh",
								overflowY: "scroll",
							}}
						>
							{pendingPackages.length === 0 ? (
								<Typography variant="body2" color="textSecondary">
									{t("no_packages")}
								</Typography>
							) : (
								pendingPackages.map((packageitem) => (
									<PackageItem key={packageitem.id} data={packageitem} />
								))
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} lg={4}>
					<Card>
						<CardHeader title={t("parking_ocupancy")} />
						<CardContent sx={{ minHeight: "22vh" }}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: "8px",
								}}
							>
								<LocalParkingIcon style={{ marginRight: "8px" }} />
								<div>
									<Typography variant="body1">
										{t("visitor_parking")}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										{t("percentage", { percentage: parkingOccupancy })}
									</Typography>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: "8px",
								}}
							>
								<LocalParkingIcon style={{ marginRight: "8px" }} />
								<div>
									<Typography variant="body1">
										{t("overdue_parking")}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										{t("overdue", { overdue: overdueParking })}
									</Typography>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} lg={4}>
					<Card>
						<CardHeader title={t("visitors")} />
						<CardContent
							sx={{
								minHeight: "22vh",
								maxHeight: "50vh",
								overflowY: "scroll",
							}}
						>
							{latestVisitors.length === 0 ? (
								<Typography variant="body2" color="textSecondary">
									{t("no_visitors")}
								</Typography>
							) : (
								latestVisitors.map((visitor) => (
									<VisitorItem key={visitor.id} data={visitor} />
								))
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

function PackageItem({ data }) {
	const { t } = useTranslation("translate-dashboard", {
		keyPrefix: "concierge",
	});
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				marginBottom: "8px",
			}}
		>
			<LocalShippingIcon style={{ marginRight: "8px" }} />
			<div>
				<Typography variant="body1">
					{t("package_for")} {data.recipient}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{t("sent_by")} {data.sender}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{t("arrived_on")} {data.drop_off}
				</Typography>
			</div>
		</div>
	);
}

function VisitorItem({ data }) {
	const { t } = useTranslation("translate-dashboard", {
		keyPrefix: "concierge",
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
					{t("visiting")} {data.community_address}
				</Typography>
			</div>
		</div>
	);
}
