'use client';

import { useTheme } from 'next-themes';
import Navbar from './components/nav-bar';
import StatsCards from './components/stats-cards';

export default function Home() {
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-slate-50';

  return (
    <div className={`poppins min-h-screen ${bgColor}`}>
      <Navbar />
      <StatsCards />
    </div>
  );
}
