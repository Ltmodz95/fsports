'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: { email_address: string; password: string }) {

    const response = await fetch('http://localhost:3000/session', {
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
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
    })
    redirect('/products')
} 