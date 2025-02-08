"use client";

import { useState } from "react";
import useAutoSave from "@/hooks/useAutoSave";
import { updateEntry } from "@/utils/api";
import { saveEntryLocally } from "@/utils/storage";
import useSaveOnExit from "@/hooks/useSaveOnExit";

interface Entry {
  id: string;
  content?: string;
}

const Editor = ({ entry }: { entry?: Entry }) => {
  const [value, setValue] = useState(entry?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const [entryId, setEntryId] = useState(entry?.id || null);

  // Auto-save logic
  // useAutoSave({
  //   value: value,
  //   callback: async (latestValue) => {
  //     if (latestValue.trim()) {
  //       setIsLoading(true);
  //       try {
  //         const currentEntry = {
  //           ...entry,
  //           content: latestValue,
  //         };

  //         // Always save locally first
  //         saveEntryLocally(currentEntry);

  //         if (entryId) {
  //           await updateEntry(entryId, latestValue);
  //         }
  //       } catch (error) {
  //         console.error("Error during autosave:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   },
  // });

  // Use custom hook for save on exit
  useSaveOnExit(entry , value);

  return (
    <div className="w-full h-full">
      {isLoading && <div>Loading ...</div>}
      <textarea
        placeholder="What's on your mind?"
        className="w-full h-full p-8 text-xl text-black outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
