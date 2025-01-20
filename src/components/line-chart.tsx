"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { parseISO, isValid } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale
);

interface LineChartProps {
  data: [number | string, number][];
  label: string;
}

export default function LineChart({ data, label }: LineChartProps) {
  const chartData = {
    datasets: [
      {
        label,
        data: data.map(([x, y]) => ({ 
          x: typeof x === 'string' ? 
             (isValid(new Date(x)) ? new Date(x) : parseISO(x)) : 
             new Date(x), 
          y 
        })),
        fill: true,
        borderColor: '#00C853',
        backgroundColor: 'rgba(0, 200, 83, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1E222D',
        titleColor: '#9CA3AF',
        bodyColor: '#fff',
        borderColor: '#2A2E39',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            return new Date(items[0].raw.x).toLocaleDateString();
          },
          label: (item: any) => {
            return `${item.raw.y.toLocaleString()} IRR`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          callback: (value: number) => `${value.toLocaleString()} IRR`,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
