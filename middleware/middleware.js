import { NextResponse } from 'next/server';

// LOGGER URL - LOGS API CALLS W/ IP ADDRESS

export function middleware(req) {
    let response = NextResponse.next();
    console.log(`[INFO] requesting: ${req.url.split("?")[0]}`);
    return response;
}