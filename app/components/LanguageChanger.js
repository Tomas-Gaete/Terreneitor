"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { Box, Typography, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";


// * This function allows the user to change the language of the page to either English or Spanish.
export default function LanguageChanger() {
	const { t, i18n } = useTranslation();
	const currentLocale = i18n.language;
	const router = useRouter();
	const currentPathname = usePathname();

	const handleChange = (e) => {
		const newLocale = currentLocale === "en" ? "es" : "en";

		// set cookie for next-i18n-router
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = date.toUTCString();
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

		// redirect to the new locale path
		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.prefixDefault
		) {
			router.push("/" + newLocale + currentPathname);
		} else {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
			);
		}

		router.refresh();
	};

	return (
		<Button sx={{ m: "auto" }} onClick={handleChange}>
			<Box
				sx={{
					display: "flex",
				}}
			>
				<LanguageIcon />
				{currentLocale === "en" ? (
					<>
						<Typography sx={{ mx: 1 }}>Español</Typography>
						<Image
							src="https://purecatamphetamine.github.io/country-flag-icons/3x2/CL.svg"
							width={20}
							height={20}
							alt="CL"
						/>
					</>
				) : (
					<>
						<Typography sx={{ mx: 1 }}>English</Typography>
						<Image
							src="https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
							width={20}
							height={20}
							alt="GB"
						/>
					</>
				)}
			</Box>
		</Button>
	);
}
