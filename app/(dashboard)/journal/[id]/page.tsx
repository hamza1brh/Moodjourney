import Editor from "@/components/Editor";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";

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
const handleAnalyze = async () => {
  const entry =
    "Today was amazing! I got a promotion at work and celebrated with friends.";

  try {
    const result = await analyze(entry);
    console.log(result); // { mood: "happy", subject: "work", color: "yellow", negative: "false" }
  } catch (error) {
    console.error(error);
  }
};

handleAnalyze();

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    { name: "Subject", value: "" },
    { name: "Summary", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: "False" },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3 ">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/5">
        <div className="bg-blue-300 px-6 py-10 ">
          <h2 className="text-black text-2xl">analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10
              "
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
