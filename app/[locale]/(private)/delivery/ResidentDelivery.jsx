import React from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { auth } from "@/auth";
import { sql } from '@vercel/postgres';
import {ResidentDeliveryComponent} from "@/app/components/deliver_component";


export default  async function ResidentDelivery() {
  const session =  await auth();
  if (!session?.user || !session?.user?.email) return null;

  let pendingPackages;
  let Historic_query;
  let AllTimePackages;
  let query;
  let name_query;
  let fullname;
  try{
    query = await sql`
        SELECT
            p.id,
            sender, 
            recipient,
            TO_CHAR(drop_off, 'YYYY-mm-DD') AS drop_off,
            community_address
        FROM 
            package p
        INNER JOIN 
            residence r ON r.id = p.residence_id
        INNER JOIN
            resident res ON res.residence_id = r.id
        WHERE 
            pick_up IS NULL 
            AND res.id = ${session.user.id};
            `;

            pendingPackages = query.rows.map(row => ({
              id: row.id,
              sender: `${row.sender}`,
              recipient: `${row.recipient}`,
              drop_off: `${row.drop_off}`,
              community_address: `${row.community_address}`
      
            }));
            name_query =await sql`
        SELECT
            firstname,
            lastname
        FROM user_info
        WHERE id = ${session.user.id};`;

        fullname = name_query.rows.map(row => ({
          result: `${row.firstname} ${row.lastname}`,
          firstname: `${row.firstname}`,
          lastname: `${row.lastname}`
        }));
            Historic_query = await sql`
        SELECT
            p.id,
            sender, 
            recipient,
            TO_CHAR(drop_off, 'YYYY-mm-DD') AS drop_off,
            community_address
        FROM 
            package p
        INNER JOIN 
            residence r ON r.id = p.residence_id
        INNER JOIN
            resident res ON res.residence_id = r.id
        WHERE res.id = ${session.user.id};
            `;
            AllTimePackages = Historic_query.rows.map(row => ({
              id: row.id,
              sender: `${row.sender}`,
              recipient: `${row.recipient}`,
              drop_off: `${row.drop_off}`,
              community_address: `${row.community_address}`
      
            }));

          }catch (error) {
          console.error("Error loading packages:", error);
          pendingPackages= [];
          AllTimePackages= [];
          fullname= [];
        }
        

    const userFullname = fullname.length > 0 ? fullname[0].result : '';
  return (
      <ResidentDeliveryComponent
      pendingPackages={pendingPackages}
      user= {userFullname}
      />
  );
}

