import { Typography } from "@mui/material";
import React from "react";
import Recommendations from "./Recommendations";

function Widgets() {
  return (
    <div className="hidden xl:inline space-y-2 w-1/4">
      <Typography>Widget</Typography>
      <Recommendations />
    </div>
  );
}

export default Widgets;
