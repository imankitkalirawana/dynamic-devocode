"use client";
import Dashboard from "@/components/Dashboard/UserDashboard";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const { loggedIn } = isLoggedIn();
  const router = useRouter();

  if (typeof window !== "undefined" && !loggedIn) {
    localStorage.setItem("redirectPath", "/dashboard");
    router.push("/auth/login");
  }
  return (
    <div className="relative mt-24 max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 items-start p-8">
      {/* main dashboard */}
      {/* menubar */}
      <div role="tablist" className="tabs tabs-bordered col-span-8">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Dashboard"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content py-10">
          <Dashboard />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Subjects"
        />
        <div role="tabpanel" className="tab-content py-10">
          Subjects
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Announcements"
        />
        <div role="tabpanel" className="tab-content py-10">
          {/* <Announcements /> */}
          Announcements
        </div>
      </div>
      {/* Calendar */}
      <div className="hidden lg:block col-span-4 lg:col-span-5 lg:col-start-9">
        {/* <Calendar /> */}
        Calendar
      </div>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(Page), { ssr: false });
