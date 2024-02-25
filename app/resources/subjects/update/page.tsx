"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/resources/subjects");
  return null;
};

export default Page;
