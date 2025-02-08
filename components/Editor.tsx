"use client";

import { updateEntry, createNewEntry } from "@/utils/api";
import { useState, useEffect } from "react";
import useAutoSave from "@/hooks/useAutoSave";
import { usePathname, useRouter } from "next/navigation";
import { saveEntryLocally } from "@/utils/storage";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry?.content || "");
  const [IsLoading, setIsLoading] = useState(false);
  const [entryId, setEntryId] = useState(entry?.id || null);
  const [isNavigating, setIsNavigating] = useState(false);

  const Router = useRouter();
  const pathname = usePathname(); // usePathname here at the top level of the component

  const handleRouteChange = (newPath) => {
    if (pathname !== newPath && entry && !isNavigating && value.trim()) {
      setIsNavigating(true);

      const currentEntry = {
        ...entry,
        content: value,
      };

      saveEntryLocally(currentEntry);

      const confirmLeave = window.confirm(
        "Changes you made may not be saved in the cloud. Leave anyway?"
      );

      if (confirmLeave) {
        Router.push(newPath);
        console.log("Entry saved locally and route changed");
      } else {
        setIsNavigating(false);
        console.log("Navigation cancelled");
      }
    }
  };

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
      event.returnValue = "";
    }
  };

  useEffect(() => {
    const events = {
      beforeunload: handleBeforeUnload,
      popstate: () => handleRouteChange(window.location.pathname),
    };

    Object.entries(events).forEach(([event, handler]) => {
      window.addEventListener(event, handler);
    });

    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
    };
  }, [handleBeforeUnload, handleRouteChange]);

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
          console.log("Saving entry locally");
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
