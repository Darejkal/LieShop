import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req:NextRequest) {
    // const url= req.nextUrl.clone()
    // if (['/','/auth'].indexOf(url.pathname)>=0) {
    //     url.pathname='/auth/login'
    //     return NextResponse.redirect(url)
    // }
    // return NextResponse.next()
}