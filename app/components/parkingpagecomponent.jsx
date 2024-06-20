// components/ParkingManagement.jsx
import { sql } from "@vercel/postgres";
import { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

const ParkingManagement = ({ parking_state, parking_DB }) => {
	const [parkingSpaces, setParkingSpaces] = useState(
		Object.entries(parking_DB).map(([id, parking]) => ({
			id: id,
			visitor: parking.firstname + " " + parking.lastname,
			car: parking.brand + "/" + parking.model,
			resident: parking.resident_firstname + " " + parking.resident_lastname,
			number: parking.number,
			status: "available",
		})),
	);

	const [sortBy, setSortBy] = useState("number");
	const [sortDirection, setSortDirection] = useState("asc");
	const [filterStatus, setFilterStatus] = useState("all");

	const handleSort = (key) => {
		if (sortBy === key) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortBy(key);
			setSortDirection("asc");
		}
	};

	const handleFilterStatus = (status) => {
		setFilterStatus(status);
	};

	const handleUpdateStatus = (id, status) => {
		setParkingSpaces(
			parkingSpaces.map((space) =>
				space.id === id ? { ...space, status } : space,
			),
		);
	};

	const filteredAndSortedSpaces = useMemo(() => {
		let spaces = [...parkingSpaces];
		if (filterStatus !== "all") {
			spaces = spaces.filter((space) => space.status === filterStatus);
		}
		spaces.sort((a, b) => {
			if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
			if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});
		return spaces;
	}, [parkingSpaces, sortBy, sortDirection, filterStatus]);

	return (
		<div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
			<Typography variant="h4" component="h1" gutterBottom>
				Parking Space Management
			</Typography>

			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Button
						variant={filterStatus === "all" ? "contained" : "outlined"}
						onClick={() => handleFilterStatus("all")}
					>
						All
					</Button>
					<Button
						variant={filterStatus === "available" ? "contained" : "outlined"}
						onClick={() => handleFilterStatus("available")}
					>
						Available
					</Button>
					<Button
						variant={filterStatus === "occupied" ? "contained" : "outlined"}
						onClick={() => handleFilterStatus("occupied")}
					>
						Occupied
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Typography variant="body2" color="textSecondary">
						Sort by:
					</Typography>
					<Button
						variant={sortBy === "number" ? "contained" : "outlined"}
						onClick={() => handleSort("number")}
					>
						Number{" "}
						{sortBy === "number" &&
							(sortDirection === "asc" ? "\u2191" : "\u2193")}
					</Button>
					<Button
						variant={sortBy === "status" ? "contained" : "outlined"}
						onClick={() => handleSort("status")}
					>
						Status{" "}
						{sortBy === "status" &&
							(sortDirection === "asc" ? "\u2191" : "\u2193")}
					</Button>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-green-500" />
					<span className="text-gray-500 dark:text-gray-400">
						Available: {parking_state.available_spaces}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-red-500" />
					<span className="text-gray-500 dark:text-gray-400">
						Occupied: {parking_state.ocupied_spaces}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-gray-500" />
					<span className="text-gray-500 dark:text-gray-400">
						Total: {parking_state.total_spaces}
					</span>
				</div>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Number</TableCell>
							<TableCell>Visitor</TableCell>
							<TableCell>Car</TableCell>
							<TableCell>Resident</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredAndSortedSpaces.map((space) => (
							<TableRow key={space.id}>
								<TableCell>{space.number}</TableCell>
								<TableCell>{space.visitor}</TableCell>
								<TableCell>{space.car}</TableCell>
								<TableCell>{space.resident}</TableCell>
								<TableCell>
									<div
										className={`px-3 py-1 rounded-full text-xs font-medium ${
											space.status === "available"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{space.status}
									</div>
								</TableCell>
								<TableCell>
									<Button
										variant="outlined"
										size="small"
										onClick={() =>
											handleUpdateStatus(
												space.id,
												space.status === "available" ? "occupied" : "available",
											)
										}
									>
										{space.status === "available"
											? "Mark as Occupied"
											: "Mark as Available"}
									</Button>
								</TableCell>
								<TableCell>Configuracion</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
export default ParkingManagement;
