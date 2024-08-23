import React, { useEffect, useState } from "react";

export default function ({ info, index }) {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState([]);
  useEffect(() => {
    const calculatedTotal = info.fields.reduce(
      (acc, graph) => acc + parseInt(graph.value),
      0
    );
    setTotal(calculatedTotal);
  }, [info.fields]);

  useEffect(() => {
    if (total > 0) {
      const counts = info.fields.reduce((acc, graph) => {
        const line = (graph.value / total) * 100;
        acc.push(line);
        return acc;
      }, []);
      setCount(counts);
    }
  }, [total, info.fields]);

  return (
    <div className="graphs">
      <h4>{info.widgetName}</h4>
      <div className="lineGraph">
        <div className="lineChart">
          <span className="totalInfo">{total}</span>
          <span>Total Vulnerabilities</span>
          <div className="infoLine">
            {info.fields.map((line, index) => (
              <div
                className="area"
                style={{ backgroundColor: line.color, width: `${count[index]}%` }}
                key={index}
              ></div>
            ))}
          </div>
        </div>
        <div className="lineChartInfo">
          {info.fields.map((graph, index) => (
            <div className="lineChartData" key={index}>
              <div className="lineChartDataColor" style={{backgroundColor: graph.color}}></div>
              <span className="lineChartDataText">{graph.field} ({graph.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
