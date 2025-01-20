"use client";

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartProps {
  options: ApexOptions;
  series: any[];
  type: "area" | "line" | "bar" | "candlestick";
  height: string | number;
}

export default function ApexChart({ options, series, type, height }: ChartProps) {
  return (
    <div>
      {/* {typeof window !== 'undefined' && ( */}
        // @ts-ignore
        <Chart options={options} series={series} type={type} height={height} />
      {/* )} */}
    </div>
  );
}
