
import ResidentVisitorComp from "@components/ResidentVisitorComp"
import { auth } from "@/auth";
import { db } from "@vercel/postgres";


export default  async function ResidentVisitor() {

    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const client = await db.connect();

    let visitorHistory;
    let frequentVisitors;

    try {

        visitorHistory = await client.sql`
        SELECT
            vtr.id,
            CONCAT(v.firstname,' ', v.lastname) AS name,
            TO_CHAR(vtr.arrival,'YYYY-MM-DD HH24:MM:SS') arrival_time,
            TO_CHAR(vtr.arrival,'YYYY-MM-DD') date,
            TO_CHAR(vtr.arrival,'HH24:MM:SS') time
        FROM 
            visit_to_residence vtr
        INNER JOIN
            visitor v on v.id = vtr.visitor_id
        INNER JOIN
            residence r on r.id = vtr.residence_id
        WHERE 
            r.id = (SELECT residence_id FROM resident WHERE id = ${session.user.id})
        ORDER BY 
            arrival_time DESC
        LIMIT 30;`;

        frequentVisitors = await client.sql`
        SELECT
            fv.id AS fv_id,
            CONCAT(v.firstname,' ', v.lastname) AS visitor_name,
            CONCAT(ui.firstname, ' ', ui.lastname) AS resident_name
        FROM 
            frequent_visitor fv
        INNER JOIN 
            visitor v ON v.id = fv.visitor_id
        INNER JOIN 
            resident r ON r.id = fv.resident_id
        INNER JOIN 
            user_info ui ON ui.id = r.user_id
        WHERE 
            fv.residence_id = (SELECT residence_id FROM resident WHERE id = 2);`;

        visitorHistory = visitorHistory.rows;
        frequentVisitors = frequentVisitors.rows;

    } catch (error) {
        visitorHistory = [];
        frequentVisitors = [];
        console.error(error);
    } finally {
        client.release();
    }

    return (
        <ResidentVisitorComp
            visitorHistory={visitorHistory}
            frequentVisitors={frequentVisitors}
        />
    );
}
