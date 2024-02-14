import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Main Dashboard</h2>
        <Link href={"/resources"} className="link btn link-primary btn-link">
          Manage
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="bg-base-200 card col-span-6 md:col-span-3 row-span-1 p-4 stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <div className="stat-title text-base">Subjects</div>
          <div className="stat-value text-primary text-lg">20+</div>
        </div>
        <div className="stat bg-primary card col-span-6 md:col-span-3 row-span-1">
          <div className="stat-figure text-base-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </div>
          <div className="stat-title text-base-100">Views</div>
          <div className="stat-value text-base-100 text-lg">2.6K</div>
        </div>

        <div className="card col-span-12 sm:col-span-6 md:col-span-6 row-span-2 relative overflow-hidden stat aspect-[2/1] md:aspect-auto">
          <img
            src="/dashboard-bg.jpg"
            alt="dashboard-img"
            className="object-center object-cover w-full h-full brightness-50 absolute inset-0 -z-10"
          />
          <div className="stat-title text-white">Total Revenue</div>
          <div className="stat-value text-primary">2.6M</div>
          <div className="flex gap-2">
            <Link href={""} className="badge badge-primary">
              Subjects
            </Link>
            <Link href={""} className="badge badge-accent">
              DL's
            </Link>
          </div>

          <div className="stat-desc text-white">
            Get access to all your university things at one place
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-base-200 card">
          <div className="diff aspect-[2/1] card">
            <div className="diff-item-1">
              <div className="bg-primary text-primary-content text-5xl font-black grid place-content-center">
                Devocode
              </div>
            </div>
            <div className="diff-item-2">
              <div className="bg-base-200 text-5xl font-black grid place-content-center">
                Devocode
              </div>
            </div>
            <div className="diff-resizer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;


