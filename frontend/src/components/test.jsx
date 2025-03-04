import { useState } from "react";

const data = [
  { name: "iphone", category: "phone" },
  { name: "touchLight", category: "electronics" },
  { name: "table water", category: "food" },
];

export default function Test() {
  const [filteredItems, setfilteredItems] = useState(data);
  const [activeFilter, setActiveFilter] = useState("All");

  function handleFilter(category) {
    setActiveFilter(category);
    if (category === "All") setfilteredItems(data);
    else {
      setfilteredItems(data.filter((items) => items.category === category));
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => handleFilter("All")}>All</button>
        <button onClick={() => handleFilter("food")}>foods</button>
        <button onClick={() => handleFilter("electronics")}>electronics</button>
        <button onClick={() => handleFilter("phone")}>phone</button>
      </div>
      <div>
        {filteredItems.map((items, i) => (
          <li key={i}>{items.name}</li>
        ))}
      </div>
    </div>
  );
}
