import React, { useEffect, useState } from "react";

export default function PieChart({ info }) {
  const [total, setTotal] = useState(0);
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    
    const calculatedTotal = info.fields.reduce((acc, graph) => acc + parseInt(graph.value), 0);
    setTotal(calculatedTotal);
  }, [info.fields]);

  useEffect(() => {
    if (total > 0) {
    
      const sliceAngles = info.fields.reduce((acc, graph) => {
        const slice = (graph.value / total) * 360;
        acc.push(acc.length > 0 ? acc[acc.length - 1] + slice : slice);
        return acc;
      }, []);

      setSlices(sliceAngles);
    }
  }, [total, info.fields]);
  let accumulatedPercentage = 0;
  const gradient = info.fields.map((item)=>{
    const percentage = (item.value/total) *100;
    const start = accumulatedPercentage;
    accumulatedPercentage += percentage;
    return `${item.color} ${start}% ${accumulatedPercentage}%`;
  }).join(', ');
  return (
    <div className="graphs">
      <h4>{info.widgetName}</h4>
      <div className="graph">
        <div className="pie-chart" style={{background: `conic-gradient(${gradient})`}}>
          <span>{`Total ${total}`}</span>
        
        </div>
        <div className="pie-chartInfo">
          {info.fields.map((secs, index) => (
            <div className="pie-chartInfoSection" key={index}>
              <div
                className="infoColour"
                style={{ backgroundColor: secs.color }}
              ></div>
              <span className="infoText">{secs.field} ({secs.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
