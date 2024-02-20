import { getSubjects } from "@/app/lib/data";

//  Page() {
//   const subjects = await getSubjects();
//   console.log(subjects);
//   return (
//     <div>
//       <h1>Subjects</h1>
//       <ul></ul>
//     </div>
//   );
// }
export default async function Page() {
  // Get the list of all available subjects and render them in a list
  const subjects = await getSubjects();
  console.log(subjects);
}
