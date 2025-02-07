"use client";

import { updateEntry, createNewEntry } from "@/utils/api";
import { useState } from "react";
import useAutoSave from "@/hooks/useAutoSave";
import { usePathname, useRouter } from "next/navigation";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry?.content || "");
  const [IsLoading, setIsLoading] = useState(false);
  const [entryId, setEntryId] = useState(entry?.id || null);
  const [isNavigating, setIsNavigating] = useState(false);

  const Router = useRouter();
  const pathname = usePathname(); // usePathname here at the top level of the component




  const handleRouteChange = (newPath) => {
    if (pathname !== newPath && entry && !isNavigating) {
      setIsNavigating(true);
      const confirmLeave = window.confirm(
        "Changes you made may not be saved. Are you sure you want to leave?"
      );
      if (confirmLeave) {
        createNewEntry(entry)
          .then(() => {
            Router.push(newPath);
          })
          .catch((error) => {
            console.error("Error saving:", error);
            alert("Error saving. Changes may be lost.");
            setIsNavigating(false); // resetting in case of error
          });
      } else {
        setIsNavigating(false); // reset the flag if user cancels
      }
    }
  };

  const handleBeforeUnload = (event) => {
    if (pathname === "/journal/new") {
      if (entry) {
        // will have to implement local storage save
        // SaveLocally(entry);
      } else {
        console.log("No entry, allowing navigation.");
      }
    }
  };





  useEffect(()=>{


  } , []); 


  

  // Auto-save logic
  useAutoSave({
    value: value,
    callback: async (latestValue) => {
      setIsLoading(true);
      if (entryId) {
        // save normally if an entry id already exists
        await updateEntry(entryId, latestValue);
      }
      setIsLoading(false);
    },
  });

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
