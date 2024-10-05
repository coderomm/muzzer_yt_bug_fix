import React from 'react'
import StreamView from '@/components/StreamView'

const creatorId = "eb19dc4d-4b1f-47b5-9905-262187028416"

export default function DashboardPage() {
  return (
    <div>
      <StreamView creatorId={creatorId as string} playVideo={true}/>
    </div>
  )
}