import { NextRequest, NextResponse } from 'next/server';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Z2ImAUh4a0nAwPQedgxtjazLydnv6FVJTyw8IFE7AWLZ6AkWgBljwqpeICV62igR8wVeMqx-1vBz/pub?output=csv';

export async function GET(req: NextRequest) {
  try {
    // Get search params
    const { searchParams } = new URL(req.url);
    const team = searchParams.get('team');

    // Fetch the CSV data
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);

    const csvText = await response.text();

    // Convert CSV to JSON
    const rows = csvText.split('\n').map(row => row.split(','));
    const headers = rows[0]; // First row contains headers
    const matches = rows.slice(1).map(row => {
      return headers.reduce((acc, header, index) => {
        acc[header.trim()] = row[index]?.trim();
        return acc;
      }, {} as Record<string, string>);
    });

    // Filter matches by team (if team query param is provided)
    const filteredMatches = team
      ? matches.filter(match => match["Team 1"] === team || match["Team 2"] === team)
      : matches;

    return NextResponse.json(filteredMatches, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
