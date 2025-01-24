'use client'

import TeamList from '@/components/TeamList'
import { fetchTeamMembers } from '@/redux/teamSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function TeamPage() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTeamMembers())
  },[])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Team Members</h1>
      <TeamList />
    </div>
  )
}

