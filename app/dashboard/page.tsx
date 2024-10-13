"use client"
import StreamView from '@/components/StreamView'
import { useSession } from 'next-auth/react';


export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <p>Please sign in to view this page.</p>;
  }
  const creatorId = session.user.id;
  
  return (
    <div>
      <StreamView creatorId={creatorId as string} playVideo={true}/>
    </div>
  )
}

export const dynamic = "auto";