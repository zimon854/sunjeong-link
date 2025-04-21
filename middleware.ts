import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Don't invoke Middleware on some paths
export const config = {
  matcher: []
};
