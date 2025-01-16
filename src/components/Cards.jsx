import React, { useEffect, useState } from "react";
import Card from "./partials/Card";

const Cards = ({ data, cat }) => {
  return (
    <div className="m-5 flex flex-col gap-3">
      <div className=" py-5 flex overflow-auto gap-5">
        {data &&
          (cat === undefined || cat == "all"
            ? data
            : data.filter((item) => item.media_type === cat)
          ).map((item, i) => {
            return <Card key={item.id} data={item} />;
          })}
      </div>
    </div>
  );
};

export default Cards;
