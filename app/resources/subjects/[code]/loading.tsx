export default function Loading() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          className="flex flex-col gap-2 w-full col-span-12 md:col-span-6 lg:col-span-4 p-4"
          key={i}
        >
          <div className="skeleton h-8 w-28"></div>
        </div>
      ))}
    </>
  );
}
