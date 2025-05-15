'use server'

import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'

export async function login(formData: { email_address: string; password: string }) {

    const response = await fetch('http://localhost:3000/api/v1/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    console.log(response.ok)
    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    console.log(data['data']['token'])
    // Set the session cookie
    const cookieStore = await cookies()
    cookieStore.set('session', data['data']['token'], {
      maxAge: 24 * 60 * 60, // 24 hours
    })
    cookieStore.set('user_role', data['data']['user_role'], {
      maxAge: 24 * 60 * 60, // 24 hours
    })
    if (data['data']['user_role'] === 'admin') {
      redirect('/admin', RedirectType.push)
    } else {
      redirect('/products', RedirectType.push)
    }

} 