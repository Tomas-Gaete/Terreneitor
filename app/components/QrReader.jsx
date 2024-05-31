"use client";
import { useEffect, useRef, useState } from "react";

// Qr Scanner
import QrScanner from "qr-scanner";
import { Box } from "@mui/material";

const QrReader = ({ handleRead }) => {
	// QR States
	const scanner = useRef();
	const videoEl = useRef(null);
	const qrBoxEl = useRef(null);
	const [qrOn, setQrOn] = useState(true);

	// Result
	const [scannedResult, setScannedResult] = useState("");

	// Success
	const onScanSuccess = (result) => {
		scanner.current.stop();
		handleRead(result);
	};

	// Fail
	const onScanFail = (err) => {
		console.log(err);
	};

	useEffect(() => {
		if (videoEl?.current && !scanner.current) {
			scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
				onDecodeError: onScanFail,
				preferredCamera: "environment", //In mobile devices, "environment" means back camera and "user" means front camera.
				highlightScanRegion: true,
				highlightCodeOutline: true,
				overlay: qrBoxEl?.current || undefined,
			});
			// Start QR Scanner
			scanner?.current
				?.start()
				.then(() => setQrOn(true))
				.catch((err) => {
					if (err) setQrOn(false);
				});
		}

		// This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
		return () => {
			if (!videoEl?.current) {
				scanner?.current?.stop();
			}
		};
	}, []);

	useEffect(() => {
		if (!qrOn)
			alert(
				"Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
			);
	}, [qrOn]);

	return (
		<Box position="relative">
			<Box
				component="video"
				sx={{
					position: "relative",
					aspectRatio: "1",
					width: "100%",
					height: "100%",
					objectFit: "cover",
					borderRadius: 5,
				}}
				ref={videoEl}
			></Box>
			<Box ref={qrBoxEl}>
				<Box
					component="img"
					src="/qr-frame.svg"
					alt="Qr Frame"
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						scale: "1.5",
						transform: "translate(-35%, -35%)",
						width: "50%",
						height: "50%",
					}}
				></Box>
			</Box>
		</Box>
	);
};

export default QrReader;
