"use client";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    code: string;
  };
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { code } = params;
  router.push(`/resources/subjects/${code}/all`);

  return null;
};

export default Page;
