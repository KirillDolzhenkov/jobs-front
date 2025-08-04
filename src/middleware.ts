import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
// import { NextResponse, NextRequest } from 'next/server';
//
// export function middleware(request: NextRequest) {
//     const authHeader = request.headers.get('authorization');
//     const isAuthorized = validateBasicAuth(authHeader);
//     if (!isAuthorized && request.nextUrl.pathname.startsWith('/admin')) {
//         return new NextResponse('Unauthorized', {
//             status: 401,
//             headers: {
//                 'WWW-Authenticate': 'Basic realm="Secure Area"',
//             },
//         });
//     }
//     return NextResponse.next();
// }
//
// function validateBasicAuth(authHeader?: string): boolean {
//     if (!authHeader || !authHeader.startsWith('Basic ')) {
//         return false;
//     }
//     const base64Credentials = authHeader.substring('Basic '.length).trim();
//     const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
//     const [username, password] = credentials.split(':');
//     const expectedUser = process.env.ADMIN_USER || 'admin';
//     const expectedPass = process.env.ADMIN_PASS || 'password';
//     return username === expectedUser && password === expectedPass;
// }
//
// export const config = {
//     matcher: '/admin/:path*',
// };
