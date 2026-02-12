import React from "react";
import Language from "./language";
import TimeFormat from "./time-format";
import FirstDay from "./first-day";

const Content = ({ id }: { id: string }) => {
  switch (id) {
    case "language":
      return <Language />;
    case "time-format":
      return <TimeFormat />;
    case "first-day":
      return <FirstDay />;
  }
};

export default Content;
