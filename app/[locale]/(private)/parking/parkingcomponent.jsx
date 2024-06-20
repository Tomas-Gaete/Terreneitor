"use client";
import ParkingManagement from "@/app/components/parkingpagecomponent";

export const Parking_Component = ({
	db_parking_space,
	db_parking_space_usage,
	ocupied_spaces,
	parking_DB,
}) => {
	const total_spaces = parking_DB.length;
	const available_spaces = total_spaces - ocupied_spaces;
	const parking_state = {
		total_spaces: total_spaces,
		ocupied_spaces: ocupied_spaces,
		available_spaces: available_spaces,
	};

	return (
		<ParkingManagement parking_state={parking_state} parking_DB={parking_DB} />
	);
};
