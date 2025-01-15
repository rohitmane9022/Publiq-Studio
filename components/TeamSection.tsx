'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addTeamMember, editTeamMember, deleteTeamMember } from '@/redux/teamSlice'
import TeamMemberForm from './TeamMemberForm'
import { TeamMember } from '@/types'

export default function TeamSection() {
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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
      {teamMembers.map((member) => (
        <div key={member.id} className="mb-4 p-4 border rounded">
          {editingMemberId === member.id ? (
            <TeamMemberForm
              member={member}
              onSubmit={handleEditMember}
              onCancel={() => setEditingMemberId(null)}
            />
          ) : (
            <>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p>Email: {member.email}</p>
              <p>Role: {member.role}</p>
              <div className="mt-2">
                <button
                  onClick={() => setEditingMemberId(member.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      {isAddingMember ? (
        <TeamMemberForm
          onSubmit={handleAddMember}
          onCancel={() => setIsAddingMember(false)}
        />
      ) : (
        <button
          onClick={() => setIsAddingMember(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Team Member
        </button>
      )}
    </div>
  )
}

