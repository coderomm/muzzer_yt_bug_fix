import React from 'react'
import StreamView from '@/components/StreamView'

export default function DashboardPage({creatorId} : {creatorId:string}) {
  return (
    <div>
      <StreamView creatorId={creatorId}/>
    </div>
  )
}