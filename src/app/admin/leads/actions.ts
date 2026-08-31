'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, isValidPassword, sessionToken } from '@/lib/admin-auth'

export async function login(formData: FormData) {
  const password = formData.get('password')
  if (typeof password !== 'string' || !isValidPassword(password)) {
    redirect('/admin/leads?error=1')
  }
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    // Default path '/' so cookieStore.delete() (which targets '/') matches.
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  redirect('/admin/leads')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  redirect('/admin/leads')
}
