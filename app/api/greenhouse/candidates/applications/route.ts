import { NextResponse } from 'next/server';

const GREENHOUSE_API_URL = 'https://harvest.greenhouse.io/v1/candidates/34555007007/applications';
const API_KEY = process.env.GREENHOUSE_API_KEY;
const ON_BEHALF_OF = process.env.GREENHOUSE_USER_ID;

export async function POST(request: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Greenhouse API key is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const headers = new Headers({
      'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/pdf',
    });

    if (ON_BEHALF_OF) {
      headers.append('On-Behalf-Of', ON_BEHALF_OF);
    }

    // Log the request details
    console.log('Greenhouse API Request:', {
      url: GREENHOUSE_API_URL,
      method: 'POST',
      headers: Object.fromEntries(headers.entries()),
      body: body
    });

    const response = await fetch(GREENHOUSE_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    // Log the response
    console.log('Greenhouse API Response:', {
      status: response.status,
      data: data
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
