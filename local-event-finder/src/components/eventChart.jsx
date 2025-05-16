// src/components/EventChart.jsx
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function EventChart({ events }) {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const counts = events.reduce((acc, e) => {
      const day = new Date(e.dates.start.dateTime).getDay(); // 0–6
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [{ label: "# of Events", data: Object.values(counts) }],
      },
    });
  }, [events]);

  return <canvas ref={canvasRef} />;
}
