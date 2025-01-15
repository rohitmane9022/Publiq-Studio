'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/projects', label: 'Projects', icon: Briefcase },
    
    { href: '/team', label: 'Team', icon: Users },
   
  ]

  return (
    <div className="bg-white text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <span className="text-2xl font-bold">PM Dashboard</span>
      </div>
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200",
              pathname === link.href
                ? "bg-gray-200 text-gray-800"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar

