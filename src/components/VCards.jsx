import React from "react";
import VCard from "./partials/VCard";
import { v4 as uuidv4 } from "uuid";

const VCards = ({ error, cardsData, title }) => {
  return (
    <div className="px-5 mt-4 flex flex-wrap gap-4 py-5 overflow-y-hidden">
      {error ? (
        <div className="text-center text-xl font-bold">Error fetching data</div>
      ) : cardsData.length ? (
        cardsData.map((t) => <VCard key={uuidv4()} data={t} title={title} />)
      ) : (
        <VCard />
      )}
    </div>
  );
};

export default VCards;
