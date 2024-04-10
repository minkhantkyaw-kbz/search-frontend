import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function transformData(data: any) {
  const transformedData = [];

  if (data.length === 0) return [];

  for (let i = 0; i < data.ids[0].length; i++) {
    const obj = {
      id: data.ids[0][i],
      distance: data.distances[0][i],
      metadata: data.metadatas[0][i],
      document: data.documents[0][i],
    };
    transformedData.push(obj);
  }

  return transformedData;
}

export function DocsList({
  docs = [],
  isLoading,
}: {
  docs: any[];
  isLoading: boolean;
}) {
  const transformedData = transformData(docs);

  if (isLoading) return <div className="">Loading...</div>;

  const docsList = transformedData.map((doc) => (
    <Dialog key={doc.id}>
      <DialogTrigger asChild>
        <Card key={doc.metadata.title}>
          <CardHeader>
            <CardTitle>{doc.metadata.title}</CardTitle>
            <CardDescription className="line-clamp-6">
              {doc.metadata.text}
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{doc.metadata.title}</DialogTitle>
        <DialogDescription className="text-base">
          {doc.metadata.text}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  ));

  return <div className="grid grid-cols-3 gap-4">{docsList}</div>;
}
