import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET request to fetch specific team stats
export async function GET(
  req: NextRequest,
  { params }: { params: { teamname: string } }
) {
  try {
    if (!params?.teamname) {
      return NextResponse.json({ error: 'Team name is required' }, { status: 400 });
    }

    const teamname = decodeURIComponent(params.teamname).toLowerCase();

    let { data: team, error } = await supabase
      .from('teams')
      .select('*')
      .ilike('name', teamname) // Case-insensitive match
      .single(); // Ensure only one team is returned

    if (error || !team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
