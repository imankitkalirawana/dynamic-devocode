import API_BASE_URL from "@/utils/config";
import Resources from "@/components/resources/Resources";
import NotFound from "@/components/assets/NotFound";

interface Props {
  params: {
    code: string;
    type: string;
  };
}

async function getResources(code: string, type: string) {
  if (type === "all") {
    const res = await fetch(
      `${API_BASE_URL}/resources/resources/?subjectCode=${code}`,
      {
        cache: "no-cache",
        method: "GET",
      }
    );
    return res.json();
  }
  const res = await fetch(
    `${API_BASE_URL}/resources/resources/?subjectCode=${code}&type=${type}`,
    {
      cache: "no-cache",
      method: "GET",
    }
  );
  return res.json();
}

export default async function Page({ params }: Props) {
  const resources = await getResources(params.code, params.type);
  // sort by title
  resources.sort((a: any, b: any) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {resources.length > 0 ? (
          resources.map((resource: any, index: any) => (
            <Resources resourceData={resource} key={index} />
          ))
        ) : (
          <NotFound message="Nothing uploaded there! Maybe you can try later." />
        )}
      </div>
    </>
  );
}
