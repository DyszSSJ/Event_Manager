import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { RootState } from "../redux/reducers";

const StatisticsChart: React.FC = () => {
  const events = useSelector((state: RootState) => state.events);
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const updateChart = () => {
      if (!chartRef.current) return;

      const svg = d3.select(chartRef.current);
      svg.selectAll("*").remove();

      const eventsByMonth: { [month: string]: number } = {};
      events.forEach((event) => {
        const month = event.date.split("-")[1];
        eventsByMonth[month] = (eventsByMonth[month] || 0) + 1;
      });

      const months = Object.keys(eventsByMonth);
      const eventCounts = Object.values(eventsByMonth);

      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const xScale: d3.ScaleBand<string> = d3
        .scaleBand()
        .domain(months)
        .range([0, width])
        .padding(0.1)
        .paddingInner(0.2)
        .paddingOuter(0.1);

      const yScaleCount = d3
        .scaleLinear()
        .domain([0, d3.max(eventCounts) || 0])
        .range([height, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxisCount = d3.axisLeft(yScaleCount);

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left},${height + margin.top})`)
        .call(xAxis);

      svg
        .append("g")
        .attr("class", "y-axis-count")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(yAxisCount);

      svg
        .selectAll(".grid-line")
        .data(yScaleCount.ticks())
        .enter()
        .append("line")
        .attr("class", "grid-line")
        .attr("x1", margin.left)
        .attr("x2", width + margin.left)
        .attr("y1", (d) => yScaleCount(d) + margin.top)
        .attr("y2", (d) => yScaleCount(d) + margin.top);

      const line = d3
        .line<number>()
        .x((_, i) => xScale(months[i])! + margin.left + xScale.bandwidth() / 2)
        .y((d) => yScaleCount(d) + margin.top);

      svg
        .append("path")
        .datum(eventCounts)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#5c6cff")
        .attr("stroke-width", 2);

      svg
        .selectAll(".dot")
        .data(eventCounts)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr(
          "cx",
          (_, i) => xScale(months[i])! + margin.left + xScale.bandwidth() / 2
        )
        .attr("cy", (d) => yScaleCount(d) + margin.top)
        .attr("r", 5)
        .attr("fill", "#5c6cff");

      svg
        .append("text")
        .attr("class", "axis-label")
        .attr(
          "transform",
          `translate(${width / 2 + margin.left},${height + margin.top + 40})`
        )
        .style("text-anchor", "middle")
        .text("Mes");

      svg
        .append("text")
        .attr("class", "axis-label")
        .attr(
          "transform",
          `translate(${margin.left - 30},${
            height / 2 + margin.top
          }) rotate(-90)`
        )
        .style("text-anchor", "middle")
        .text("Cantidad de Eventos");
    };

    updateChart();
  }, [events]);

  return (
    <div>
      <h2>Estadísticas del Gráfico</h2>
      <svg
        ref={chartRef}
        style={{ height: 400, width: 600, marginRight: 50 }}
      ></svg>
    </div>
  );
};

export default StatisticsChart;
