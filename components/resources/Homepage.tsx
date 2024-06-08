"use client";
import { Avatar, Button, Card, Image, ScrollShadow } from "@nextui-org/react";
import { IconBook, IconSpeakerphone } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

interface HomepageProps {
  subjects: any;
}

const Homepage: React.FC<HomepageProps> = ({ subjects }) => {
  return (
    <>
      <div className="mt-24 max-w-7xl m-auto grid grid-cols-12 gap-4 gap-y-8 p-8">
        {/* subjects */}

        <Card
          className="w-full col-span-12 p-4 md:col-span-8 md:col-start-3 lg:col-span-6"
          tabIndex={-1}
        >
          <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
            <div className="flex items-center gap-3">
              <Avatar showFallback fallback={<IconBook />}></Avatar>
              <p className="text-large font-medium">Subjects</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {subjects.slice(0, 3).map((subject: any, index: any) => (
              <Card
                as={Link}
                href={`/resources/subjects/${subject.code}`}
                key={index}
                isPressable
                isHoverable
                shadow="lg"
                className="aspect-square flex justify-center items-center"
              >
                <div className="stat-value text-2xl">{subject.code}</div>
              </Card>
            ))}
          </div>
          <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-end gap-2">
            <Button
              as={Link}
              href="/resources/subjects"
              fullWidth
              variant="flat"
            >
              View All
            </Button>
          </div>
        </Card>

        {/* announcements */}
        <Card
          className="w-full col-span-12 p-4 md:col-span-8 md:col-start-3 lg:col-span-6"
          tabIndex={-1}
        >
          <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
            <div className="flex items-center gap-3">
              <Avatar showFallback fallback={<IconSpeakerphone />}></Avatar>
              <p className="text-large font-medium">Announcements</p>
            </div>
          </div>

          <ScrollShadow size={100} className="p-4 space-y-2 w-full h-[200px]">
            {/* {Array.from({ length: 8 }, (_, index) => (
              <Card
                as={Link}
                href={`/resources`}
                isHoverable
                isPressable
                key={index}
                fullWidth
                className="px-4 py-2 text-nowrap overflow-hidden overflow-ellipsis"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                nec nulla euismod, tempus odio in, fermentum nunc. Donec nec
                urna nec justo suscipit tincidunt. Sed condimentum, nisi sit
                amet.
              </Card>
            ))} */}
            {/* No Announcement available */}
            <Card
              fullWidth
              className="px-4 py-2 text-nowrap overflow-hidden overflow-ellipsis"
            >
              No Announcement available
            </Card>
          </ScrollShadow>
          <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-end gap-2">
            <Button
              onPress={() => {
                toast.error("Coming soon!", {
                  icon: "🚧",
                  id: "announcement-coming-soon",
                });
              }}
              fullWidth
              variant="flat"
            >
              View All
            </Button>
          </div>
        </Card>
        {/* Dl's */}
      </div>
    </>
  );
};

export default Homepage;
