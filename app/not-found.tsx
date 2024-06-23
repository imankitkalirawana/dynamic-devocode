import Link from "next/link";
import INotFound from "@/components/assets/NotFound";
import { Button } from "@nextui-org/react";
import { IconArrowRight } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-24">
      <INotFound message="We couldn't found what you are looking for" />
      <div className="flex gap-4 mt-4">
        <Button as={Link} href="/" variant="flat">
          Return Home
        </Button>
        <Button
          as={Link}
          href="/resources"
          endContent={<IconArrowRight size={16} />}
          variant="light"
          color="primary"
        >
          Explore Resources
        </Button>
      </div>
    </div>
  );
}
