"use client";

import { updateEntry, createNewEntry } from "@/utils/api";
import { useState, useEffect } from "react";
import useAutoSave from "@/hooks/useAutoSave";
import { saveEntryLocally } from "@/utils/storage";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry?.content || "");
  const [IsLoading, setIsLoading] = useState(false);
  const [entryId, setEntryId] = useState(entry?.id || null);

  const handleBeforeUnload = (event) => {
    if (value.trim()) {
      // Only save if there's content
      const currentEntry = {
        ...entry,
        content: value,
      };

      console.log("Saving entry before unloading");
      saveEntryLocally(currentEntry);
      event.preventDefault();
    }
  };

  // Auto-save logic
  useAutoSave({
    value: value,
    callback: async (latestValue) => {
      if (latestValue.trim()) {
        setIsLoading(true);
        try {
          const currentEntry = {
            ...entry,
            content: latestValue,
          };

          // Always save locally first
          saveEntryLocally(currentEntry);

          if (entryId) {
            await updateEntry(entryId, latestValue);
          }
        } catch (error) {
          console.error("Error during autosave:", error);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    const events = {
      beforeunload: handleBeforeUnload,
    };

    Object.entries(events).forEach(([event, handler]) => {
      window.addEventListener(event, handler);
    });

    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
    };
  }, [handleBeforeUnload]);

  return (
    <div className="w-full h-full">
      {IsLoading && <div>Loading ...</div>}
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
