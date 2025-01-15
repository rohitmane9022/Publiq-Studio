'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function TeamOverview() {
  const teamMembers = useSelector((state: RootState) => state.team.teamMembers)

  return (
    <Link href="/team">
    <Card>
      <CardHeader>
        <CardTitle>Team Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.slice(0, 5).map((member) => (
            <div key={member.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

