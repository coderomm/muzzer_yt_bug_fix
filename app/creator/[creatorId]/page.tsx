import StreamView from "@/components/StreamView";
import { useSession } from "next-auth/react";

export default function CreatorPage() {
  const {data: session , status} = useSession()
  
  if(status === 'loading') {
    return <p>Loading...</p>
  }

  if(!session) {
    return <p>SignIn first </p>
  }
  const creatorId = session.user.id;
  return (
    <div>
      <StreamView creatorId={creatorId as string} playVideo={false}/>
    </div>
  );
}
  