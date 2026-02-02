import { getMockStats } from '@/lib/mock-data';
import { Users, UserCheck, UserX, Activity, Plus } from 'lucide-react';
import { StatCard, QuickActionCard } from '@/components/DashboardWidgets';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stats = await getMockStats();

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--foreground)', letterSpacing: '-0.025em' }}>Dashboard</h1>
          <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem', fontSize: '1.05rem' }}>Overview of your workforce today.</p>
        </div>
        <Link href="/employees" style={{
          background: 'var(--primary)',
          color: 'white',
          textDecoration: 'none',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
        }}>
          <Plus size={18} /> Quick Add
        </Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users size={24} />}
          trend="+20% from last month"
          color="blue"
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          icon={<UserCheck size={24} />}
          trend="85% attendance rate"
          color="green"
        />
        <StatCard
          title="Absent Today"
          value={stats.absentToday}
          icon={<UserX size={24} />}
          trend="3 employees on leave"
          color="red"
        />
        <StatCard
          title="Active Projects"
          value="12"
          icon={<Activity size={24} />}
          trend="4 deadlines this week"
          color="purple"
        />
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <Link href="/employees" style={{ textDecoration: 'none' }}>
            <QuickActionCard>Add New Employee</QuickActionCard>
          </Link>
          <Link href="/attendance" style={{ textDecoration: 'none' }}>
            <QuickActionCard>Mark Attendance</QuickActionCard>
          </Link>
          {['Generate Report', 'Department Meeting'].map((action, i) => (
            <QuickActionCard key={i}>
              {action}
            </QuickActionCard>
          ))}
        </div>
      </div>
    </div>
  );
}
