
type Props = {
    params: {
      creatorId: string;
    };
};
  
export default function CreatorPage({ params: { creatorId } }: Props) {
return (
    <div>
    {creatorId}
    </div>
);
}
  