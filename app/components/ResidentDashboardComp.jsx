"use client"

import { Card, CardHeader, CardContent, Avatar, Grid, Typography, Container } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTranslation } from 'react-i18next';

export default function ResidentConciergeComp({
	pendingPackages,
	latestVisitors,
}) {
    const { t } = useTranslation('translate-dashboard', {keyPrefix:"resident"});
  return (
      <Container component="main" style={{ flex: 1, padding: '16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            {t('welcome')}
          </Typography>
          <Typography variant="body1" color="secondary">
            {t('subtitle')}
          </Typography>
        </div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <CardHeader title={t("pending_packages")} />
              <CardContent
							sx={{
								maxHeight: "50vh",
								overflowY: "scroll",
							}}
						>
                {pendingPackages.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">{t("no_packages")}</Typography>
                ) : (
                  pendingPackages.map((packageitem) => (
                    <PackageItem key={packageitem.id} data={packageitem} />
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <CardHeader title={t("visitors")} />
              <CardContent
							sx={{
								maxHeight: "50vh",
								overflowY: "scroll",
							}}
						>
                {latestVisitors.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">{t("no_visitors")}</Typography>
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
	const { t } = useTranslation("translate-dashboard", {keyPrefix:"resident"});
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
	const { t } = useTranslation("translate-dashboard", {keyPrefix:"resident"});
    
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
					{t("visiting", {date: data.date, time: data.time})}
				</Typography>
			</div>
		</div>
	);
}
