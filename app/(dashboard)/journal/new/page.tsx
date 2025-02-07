import Editor from "@/components/Editor";

import { defaultEntry } from "@/utils/constants";

const NewEntry = async () => {
  const entry = defaultEntry;

  return (
    <div className="h-full w-full grid grid-cols-3 ">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
    </div>
  );
};

export default NewEntry;
