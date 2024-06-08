"use client";
import { useRouter } from "next/navigation";
import { Tabs, Tab } from "@nextui-org/react";
import React from "react";
import Overview from "@/components/settings/Overview";
import Profile from "@/components/settings/Profile";
import Preference from "@/components/settings/Preferences";
import Security from "@/components/settings/Security";

const Page = () => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/settings/preference");
  // }, []);

  const [selected, setSelected] = React.useState("overview");

  return (
    <>
      <div className="mt-24 max-w-7xl m-auto p-8">
        <Tabs
          aria-label="Settings"
          selectedKey={selected}
          // @ts-ignore
          onSelectionChange={setSelected}
        >
          <Tab key="overview" title="Overview">
            <Overview />
          </Tab>
          <Tab key="profile" title="Profile">
            <Profile />
          </Tab>
          <Tab key="prefrence" title="Preference">
            <Preference />
          </Tab>
          <Tab key="security" title="Security">
            <Security />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
