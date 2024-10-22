import StreamView from "@/components/StreamView";

export default function CreatorPage({creatorId} : {creatorId : string}) {
  
  return (
    <div>
      <StreamView creatorId={creatorId} playVideo={false}/>
    </div>
  );
}

export const dynamic = "auto";