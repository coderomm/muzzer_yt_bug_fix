import React from 'react'
import StreamView from '@/components/StreamView'

const creatorId = "ad376f8e-e117-4007-a3f4-5c6021176a87"
export default function DashboardPage() {
  return (
    <div>
      <StreamView creatorId={creatorId}/>
    </div>
  )
}