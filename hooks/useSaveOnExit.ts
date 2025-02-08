import { useEffect } from "react";
import { saveEntryLocally } from "@/utils/storage";

interface Entry {
  id: string;
  content?: string;
}

const useSaveOnExit = (entry: Entry, value: string): void => {
  useEffect(() => {
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
    }): void => {
      if (value.trim()) {
        // Only save if there's content
        const currentEntry: Entry = {
          ...entry,
          content: value,
        };

        console.log("Saving entry before unloading");
        saveEntryLocally(currentEntry);
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [entry, value]);
};

export default useSaveOnExit;
