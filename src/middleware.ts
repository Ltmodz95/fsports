import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  const requestHeaders = new Headers(request.headers)
  
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths except static files and public assets
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 