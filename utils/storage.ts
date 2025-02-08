export const saveEntryLocally = (entry) => {
  try {
    if (!entry) throw new Error("No entry provided");

    let timestamp = new Date().toISOString() || entry.createdAt;
    // Use the existing draft key or entry.id if it exists
    let key = entry.id || "unsaved_draft";

    // Store or update entry in local storage
    localStorage.setItem(
      key,
      JSON.stringify({ ...entry, id: key, createdAt: timestamp })
    );

    console.log(`Entry saved to local storage with key ${key}`);
    return { status: "success", key };
  } catch (error) {
    console.error("Error saving entry to local storage", error);
    return { status: "error", error };
  }
};
