const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow text-black">
      <div className="px-4 py-5 sm:px-6 ">{date}</div>
      <div className="px-4 py-5 sm:p-6 ">{entry.content}</div>
      <div className="px-4 py-4 sm:px-6"> {entry.analysis}</div>
    </div>
  );
};

export default EntryCard;
