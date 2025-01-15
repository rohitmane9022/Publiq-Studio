'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addTeamMember, editTeamMember, deleteTeamMember } from '@/redux/teamSlice'
import TeamMemberForm from './TeamMemberForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Pencil, Trash2, Plus } from 'lucide-react'

export default function TeamList() {
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const teamMembers = useSelector((state: RootState) => state.team.teamMembers)
  const dispatch = useDispatch()

  const handleAddMember = (member: TeamMember) => {
    dispatch(addTeamMember(member))
    setIsAddingMember(false)
  }

  const handleEditMember = (member: TeamMember) => {
    dispatch(editTeamMember(member))
    setEditingMemberId(null)
  }

  const handleDeleteMember = (memberId: string) => {
    dispatch(deleteTeamMember(memberId))
  }

  return (
    <div className="space-y-6">
      {teamMembers.map((member) => (
        <Card key={member.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
              <div>
                <Button variant="ghost" size="icon" onClick={() => setEditingMemberId(member.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingMemberId === member.id ? (
              <TeamMemberForm
                member={member}
                onSubmit={handleEditMember}
                onCancel={() => setEditingMemberId(null)}
              />
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Email: {member.email}</p>
                <p className="text-sm text-muted-foreground">Role: {member.role}</p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      {isAddingMember ? (
        <Card>
          <CardContent className="pt-6">
            <TeamMemberForm
              onSubmit={handleAddMember}
              onCancel={() => setIsAddingMember(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsAddingMember(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      )}
    </div>
  )
}

