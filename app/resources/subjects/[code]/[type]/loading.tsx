export default function Loading() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          className="flex flex-col gap-2 w-full col-span-12 md:col-span-6 lg:col-span-4 p-4"
          key={i}
        >
          <div className="flex justify-between items-center">
            <div className="skeleton h-8 w-28"></div>
            <div className="skeleton h-8 w-8 rounded-full"></div>
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="flex justify-between items-center gap-4">
            <div className="skeleton h-4 w-[40%]"></div>
            <div className="skeleton h-4 w-[30%]"></div>
          </div>
        </div>
      ))}
    </>
  );
}
