import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import LineGraph from "./LineGraph";
import AddWidget from "./AddWidget";

export default function Dashboard() {
  const [newGraph, setNewGraph] = useState("");
  const [pieChartData, setPieChartData] = useState([]);
  const [lineGraphData, setLineGraphData] = useState([]);
  const [isAddWidgetVisible, setIsAddWidgetVisible] = useState(false);

  const addPieCharts = (e) => {
    e.preventDefault();
    setNewGraph("piechart");
    setIsAddWidgetVisible(true);
  };

  const addLineGraphs = (e) => {
    e.preventDefault();
    setNewGraph("linegraph");
    setIsAddWidgetVisible(true);
  };

  useEffect(() => {
    const getData = () => {
      let pieChartInfo = JSON.parse(localStorage.getItem("piechart")) || [];
      setPieChartData(pieChartInfo);
      let lineGraphInfo = JSON.parse(localStorage.getItem("linegraph")) || [];
      setLineGraphData(lineGraphInfo);
    };
    getData();
  }, []);

  const handleWidgetAdded = () => {
    const getData = () => {
      let pieChartInfo = JSON.parse(localStorage.getItem("piechart")) || [];
      setPieChartData(pieChartInfo);
      let lineGraphInfo = JSON.parse(localStorage.getItem("linegraph")) || [];
      setLineGraphData(lineGraphInfo);
    };
    getData();
  };
  const handleCloseWidgetForm = () => {
    setIsAddWidgetVisible(false);
  };


  return (
    <div className="dashboard">
      <div className="dashboardContainer">
        {isAddWidgetVisible && (
          <div className="addWidgetsContainer">
            <AddWidget graphs={newGraph} onClose={handleCloseWidgetForm} onWidgetsAdd={handleWidgetAdded}/>
          </div>
        )}
        <div className="dashboardTop">
          <h2>CNAPP Dashboard</h2>
        </div>

        <div className="dashboardMain">
          <div className="dashboardCategory">
            <h3>Category</h3>
            <div className="categoryGraphs">
              <div className="graphList">
                {pieChartData.length >0? (
                  pieChartData.map((graphs, index) => (
                    <PieChart info={graphs} key={index} />
                  ))
                ) : ''}
                <div className="addGraphWidget">
                  <button onClick={addPieCharts}>+ Add Widget</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboardCategory">
            <h3>Category</h3>
            <div className="categoryGraphs">
              <div className="graphList">
                {lineGraphData.length >0? (
                  lineGraphData.map((graphs, index) => (
                    <LineGraph info={graphs} key={index} />
                  ))
                ) :''}
                <div className="addGraphWidget">
                  <button onClick={addLineGraphs}>+ Add Widget</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
