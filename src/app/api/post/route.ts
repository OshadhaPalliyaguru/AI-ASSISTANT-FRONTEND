import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, body: requestBody, params } = body;

    
    const BACKEND_URL = `http://localhost:8080${url}`;

    const response = await axios.post(BACKEND_URL, requestBody, { params });

    return NextResponse.json({ data: response.data });
  } catch (error: any) {
    console.error("Proxy Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Backend Connection Failed" }, { status: 500 });
  }
}