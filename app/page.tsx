'use client';

import { useTheme } from 'next-themes';
import Navbar from './components/nav-bar';
import StatsCards from './components/stats-cards';
import TasksArea from './components/tasks-area/tasks-area';

export default function Home() {
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-slate-50';

  return (
    <div className={`poppins min-h-screen ${bgColor}`}>
      <Navbar />
      <StatsCards />
      <TasksArea />
    </div>
  );
}
