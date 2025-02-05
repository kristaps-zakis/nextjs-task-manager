'use client';

import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { FaTasks, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

type SingleCard = {
  title: string;
  value: string;
  icon: ReactNode;
};

export default function StatsCards() {
  const stats: SingleCard[] = [
    {
      title: 'Total Tasks',
      value: '120',
      icon: <FaTasks />,
    },
    {
      title: 'Completed Tasks',
      value: '85',
      icon: <FaCheckCircle />,
    },
    {
      title: 'Pending',
      value: '0',
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-6 p-6">
        {stats.map((stat, index) => (
          <SingleStatCard key={index} SingleCard={stat} />
        ))}
      </div>
    </>
  );
}

function SingleStatCard({ SingleCard }: { SingleCard: SingleCard }) {
  return (
    <Card className="p-4 flex flex-col gap-2 shadow-none">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">
          {SingleCard.title}
        </span>

        <div className="size-7 rounded-md flex justify-center items-center text-sm bg-primary/25 font-bold text-primary">
          {SingleCard.icon}
        </div>
      </div>
      <div className="text-3xl font-bold">{SingleCard.value}</div>
    </Card>
  );
}
