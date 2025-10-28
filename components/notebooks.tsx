"use client";

import React from "react";
import { type Notebook } from "@/db/schema";

const Notebooks = ({ notebooks }: { notebooks: Notebook[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notebooks.map((notebook) => (
        <div key={notebook.id}>{notebook.name}</div>
      ))}
    </div>
  );
};

export default Notebooks;
