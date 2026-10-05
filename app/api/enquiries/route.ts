export async function POST() {
  return Response.json({ code: 'DEMO_ONLY', message: 'Live enquiries are not enabled.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}

