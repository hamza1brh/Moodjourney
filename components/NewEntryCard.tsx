"use client";

import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    router.push(`/journal/new`);
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
