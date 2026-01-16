import { NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const allowedHelpTypes = new Set(["marketing", "consulting", "research", "other"]);
const SUPABASE_TABLE = "leads";

type ContactPayload = {
  name: string;
  email: string;
  helpType: string;
  projectDetails?: string;
  language?: string;
};

const isValidEmail = (email: string): boolean =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

export async function POST(request: Request): Promise<NextResponse> {
  if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
    return NextResponse.json(
      { error: "Server is missing Supabase configuration." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const name = payload?.name?.trim() ?? "";
  const email = payload?.email?.trim() ?? "";
  const helpType = payload?.helpType?.trim().toLowerCase() ?? "";
  const projectDetails = payload?.projectDetails?.trim() ?? "";
  const language = payload?.language?.trim() ?? null;

  if (!name || name.length > 120) {
    return NextResponse.json(
      { error: "Please provide your name (max 120 characters)." },
      { status: 400 },
    );
  }

  if (!email || email.length > 150 || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (!allowedHelpTypes.has(helpType)) {
    return NextResponse.json(
      { error: "Select what you need help with." },
      { status: 400 },
    );
  }

  if (projectDetails.length > 2000) {
    return NextResponse.json(
      { error: "Project details are too long (max 2000 characters)." },
      { status: 400 },
    );
  }

  const supabaseUrl = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`;

  const response = await fetch(supabaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name,
      email,
      help_topic: helpType,
      message: projectDetails || null,
      source: language ? `website-${language}` : "website",
    }),
  });

  if (!response.ok) {
    const detailText = await response.text();

    const missingTable =
      detailText.includes("Could not find the table") &&
      detailText.includes(SUPABASE_TABLE);

    return NextResponse.json(
      missingTable
        ? {
            error: `Supabase table '${SUPABASE_TABLE}' is missing. Create the table or update the API route to point to the correct destination.`,
            detail: detailText,
          }
        : {
            error: "Unable to save your message. Please try again later.",
            detail: detailText,
          },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
