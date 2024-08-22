import { authOptions, CustomSession } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function DashboardRouteButton() {
    const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div>
        {session && (session?.user?.role === "Admin" || session?.user?.role === "admin") ? (
        <div className="flex items-center cursor-pointer text-gray-500 text-md hover:bg-gray-100 p-2 rounded-lg">
            Dashboard
        </div>
        ):
        <div></div>
        }
    </div>
  )
}
