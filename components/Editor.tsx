"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [IsLoading, setIsLoading] = useState(false);

  /*
  i ll need to build the auto save hook myself 
 useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setIsLoading(false);
    },
  });*/

  return (
    <div className="w-full h-full">
      {IsLoading && <div>Loading ...</div>}
      <textarea
        className="w-full h-full p-8 text-xl text-black outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
