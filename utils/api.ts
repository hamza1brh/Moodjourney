const createURL = (path) => {
  return window.location.origin + path;
};

export const createNewEntry = async (content = "") => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return null;
};

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
