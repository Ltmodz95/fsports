import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const publicRoutes = ['/login', '/']
export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    if (publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.next()
    }
    const response = await fetch('http://localhost:3000/api/v1/session/verify?token=' + session)
    
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const data = await response.json()
        if (data["data"]["user_role"] !== 'admin') {
            cookieStore.delete("user_role")
            cookieStore.delete('session')
            const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
            return redirectResponse
        }
    }
    if (response.status === 401) {
        cookieStore.delete('session')
        const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
        return redirectResponse
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api/auth|public|_next/static|_next/image|static|favicon.ico).*)']
}