"use client"; // Error components must be Client Components
import { toast } from "sonner";

import { useEffect } from "react";
import NotFound from "@/components/assets/NotFound";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center mt-24">
        <NotFound message={error.message} />
      </div>
    </>
  );
}
