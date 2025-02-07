"use client";

const Analysis = ({ data }) => {
  const color = data.find((item) => item.name === "color").value;

  return (
    <div className="border-l border-black/5">
      <div className="px-6 py-10" style={{ backgroundColor: color }}>
        {" "}
        <h2 className="text-white text-2xl">analysis</h2>
      </div>
      <div>
        <ul>
          {data.map(
            (item) =>
              item.name !== "color" && (
                <li
                  key={item.name}
                  className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                >
                  <span className="text-lg font-semibold">{item.name}</span>
                  <span>{item.value}</span>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Analysis;
