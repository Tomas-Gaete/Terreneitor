import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { auth } from "@/auth";
import React from "react";
import { sql } from '@vercel/postgres';
import {ProfileComponent} from "@/app/components/ProfileComp";


export default async function Profile() {
    const session = await auth();
if (!session) {
redirect("/login");
}
    let query
    let data
    try{
        query = await sql`SELECT
    ui.id,
    ui.firstname || ' ' || ui.lastname AS name,
    ui.email,
    ui.role_id,
    ro.description,
    CASE
        WHEN ui.role_id = 5 THEN r.cellphone
        ELSE NULL
    END AS cellphone,
    CASE
        WHEN ui.role_id = 5 THEN r.residence_id
        ELSE NULL
    END AS residence_id,
    CASE
        WHEN ui.role_id = 5 THEN rs.community_address
        ELSE NULL
    END AS community_address
FROM
    user_info ui
JOIN
    role ro ON ui.role_id = ro.id
LEFT JOIN
    resident r ON ui.id = r.user_id
LEFT JOIN
    residence rs ON r.residence_id = rs.id
WHERE
    ui.id = ${session.user.id};
`;
      data = query.rows.map(row => ({
        id: row.id,
        name: `${row.name}`,
        email: `${row.email}`,
        role_id: `${row.role_id}`,
        cellphone: row.cellphone ? `+${row.cellphone}` : 'Unavailable',
        residence_id: `${row.residence_id}`,
        residence: row.community_address ? `${row.community_address}` : 'Unavailable',
        description : `${row.description}`
      }
));
      //console.log(data)
    } catch (error) {
        console.error("Error loading user data:", error);
        data= [];
    }

  return (<ProfileComponent data={data}/>)};