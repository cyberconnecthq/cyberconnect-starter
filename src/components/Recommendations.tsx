import { useWeb3 } from "@/context/web3Context";
import React from "react";

function Recommendations() {
  const recommendations = useWeb3();
  console.log("recommendation: ",recommendations)
  return (
<>

<div>Recommendations</div>
{recommendations.list && 
recommendations.list.map((recommendation)=> (
  <div key={address}>{recommendation.address}</div>
))
}
</>
  ) 
}

export default Recommendations;
