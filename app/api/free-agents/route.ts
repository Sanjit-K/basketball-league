import { NextResponse } from "next/server";

// Replace this with your public CSV URL
const GOOGLE_SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDXX6SvwRP6ZA8PTKG7ObHn0P90gfWuH4aj5EPx30N7SUH32GLySDaAkV_jHMrz7rz0QIteCw9IpSa/pub?output=csv";

export async function GET() {
  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);

    if (!response.ok) {
      console.error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: "Failed to fetch CSV data" }, { status: 500 });
    }

    const csvData = await response.text();

    console.log("CSV Data:", csvData);

    // Parse CSV into JSON
    const rows = csvData.split("\n").slice(1); // Skip the header
    const agents = rows
      .map((row) => {
        const cols = row.split(",").map((col) => col.trim());

        if (cols.length >= 3 && cols[1]) {
          return {
            name: cols[1] || "Unnamed", // Name
            instagram: cols[2] || "", // Instagram handle
          };
        }
        return null;
      })
      .filter((agent) => agent !== null);

    console.log("Parsed Agents:", agents);

    return NextResponse.json({ agents }, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/free-agents:", error.message || error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message || error },
      { status: 500 }
    );
  }
}
