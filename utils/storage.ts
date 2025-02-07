export const saveEntryLocally = (entry) => {
  try {
    if (!entry) throw new Error("No entry provided");

    const timeStamp = Date.now();
    let key = entry.id || `entry_${timeStamp}`;

    //store or update entry
    localStorage.setItem(key, JSON.stringify({ ...entry, id: key }));

    console.log(`Entry saved to local storage with key ${key}`);
    return { status: "success", key };
  } catch (error) {
    console.error("Error saving entry to local storage ", error);
    return { status: "error", error };
  }
};
