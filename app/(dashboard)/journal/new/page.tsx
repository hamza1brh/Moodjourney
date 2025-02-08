import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";

import { defaultEntry } from "@/utils/constants";

const user = await getUserByClerkId();


const NewEntry = async () => {
  const entry = defaultEntry;

  return (
    <div className="h-full w-full grid grid-cols-3 ">
      <div className="col-span-2">
        <Editor entry={{...entry , userId : user.id}} />
      </div>
    </div>
  );
};

export default NewEntry;
