"use client";

import { useState } from "react";
// import Logo from "./Logo";
// 463. Client Components in Server Components
export default function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      {/* <Logo /> */}
      {/* The Logo component imported here is actually the server component, it can be rendered on server, but since we're importing it here in a client component, this Logo component instance will be now a client component */}
    </span>
  );
}
