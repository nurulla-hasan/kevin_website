'use client';

import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';



export default function PastPerformance({dashboardStats}) {
  const data = [
  {
    name: 'Provided Services',
    uv: dashboardStats?.data?.totalServices,
    fill: '#5A6BFF',
  },
  {
    name: 'Project Quotes',
    uv: dashboardStats?.data?.totalQuotes,
    fill: '#A1E3B3',
  },
  {
    name: 'Average Ratting',
    uv:dashboardStats?.data?.averageRating,
    fill: '#4B5563',
  },
];
  return (
    <div className="border  border-gray mt-1 text-black p-8 rounded-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Past Performance</h2>
      <div className="flex  items-center">
        <RadialBarChart
          width={300}
          height={300}
          cx={150}
          cy={150}
          innerRadius={30}
          outerRadius={140}
          barSize={20}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar label={false} background dataKey="uv" />
        </RadialBarChart>

        <div className="flex flex-col gap-4 ml-1">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.fill }}
              ></div>
              <span className="text-sm" style={{ color: entry.fill }}>
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
