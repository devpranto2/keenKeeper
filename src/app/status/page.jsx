'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function StatusPage() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const interactions = JSON.parse(
      sessionStorage.getItem('temp_interactions') || '[]'
    );

    const counts = {
      Text: 0,
      Call: 0,
      Video: 0,
    };

    interactions.forEach((item) => {
      if (counts[item.type] !== undefined) {
        counts[item.type]++;
      }
    });

    const data = Object.entries(counts)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
      }));

    setChartData(data);
  }, []);

  const COLORS = {
    Text: '#7C3AED',
    Call: '#164E3F',
    Video: '#22C55E',
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-800 mb-8">
          Friendship Analytics
        </h1>

        <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm text-slate-700 mb-10">
            By Interaction Type
          </h3>

          <div className="w-full h-[400px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={105}
                    cornerRadius={12}
                    paddingAngle={6}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[entry.name]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [value, name]}
                  />

                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: '30px',
                      fontSize: '13px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No interaction data found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}