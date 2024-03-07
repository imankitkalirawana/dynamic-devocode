import { MetadataRoute } from "next";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/subjects`);
    const subjects = await response.json();


    const subjectPaths = subjects.map((subject: any) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/resources/subjects/${subject.code}/all`,
        lastModified: new Date(subject.updatedDate ? subject.updatedDate : subject.addedDate).toISOString(),

    }));
    return [
        {
            url: `${process.env.NEXT_PUBLIC_API_URL}/about`,
        },
        ...subjectPaths
    ]
}