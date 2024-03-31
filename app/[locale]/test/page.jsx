import { sql } from "@vercel/postgres";

export default async function Cart({ params }) {
  const { rows } = await sql`SELECT * from visitor`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.firstname} - {row.lastname}
        </div>
      ))}
    </div>
  );
}