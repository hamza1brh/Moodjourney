import Analysis from "@/components/Analysis";
import Editor from "@/components/Editor";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";

import { prisma } from "@/utils/db";

const getEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });

  return entry;
};

// Example of how to use the analyze function
const handleAnalyze = async (entry) => {
  try {
    const result = await analyze(entry);
    //console.log(result); // { mood: "happy", subject: "work", color: "yellow", negative: "false" }
    return result;
  } catch (error) {
    console.error(error);
  }
};

const EntryPage = async ({ params }) => {
  const { id } = await params; //  trying to synchroneously get the id from the params in a dynamic route causes errors , you need to await it before accessing its properties
  const entry = await getEntry(id);
  let mood, subject, color, negative, summary;
  //  { mood, subject, color, negative, summary } = await handleAnalyze(
  //   entry.content
  // );

  const analysisData = [
    { name: "Subject", value: subject || null },
    { name: "Summary", value: summary || null },
    { name: "Mood", value: mood || null },
    { name: "color", value: color || null },
    { name: "Negative", value: /*negative.toString()*/ null },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3 ">
      <div className="col-span-2">
        <Editor entry={entry}  />
      </div>
      <Analysis data={analysisData} />
    </div>
  );
};

export default EntryPage;
