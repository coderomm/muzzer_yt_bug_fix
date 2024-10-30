"use client"
import { useParams } from "next/navigation";
import StreamView from "@/components/StreamView";

export default function CreatorPage() {

  const { creatorId } = useParams()

  if (!creatorId || typeof creatorId !== "string") return null; 
  
  return (
    <div>
      <StreamView creatorId={creatorId} playVideo={false} />
    </div>
  );
}
