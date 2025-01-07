"use client";

import { createNewEntry } from "@/utils/api";

import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const data = await createNewEntry();
      if (!data) {
        console.error("No data returned from createNewEntry");
        return;
      }
      router.push(`/journal/${data.id}`);
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Handle error appropriately - could show user feedback here
    }
  };

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl text-black ">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
