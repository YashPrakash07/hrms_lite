import { fetchStats, fetchRecentAttendance } from '@/lib/api';
import { Users, UserCheck, UserX, Activity, Plus, CheckCircle, XCircle } from 'lucide-react';
import { StatCard, QuickActionCard } from '@/components/DashboardWidgets';
import Link from 'next/link';
import { calculateAttendancePercentage, formatDate } from '@/lib/utils';
import { Suspense } from 'react';
import { CardSkeleton, TableSkeleton } from '@/components/Skeleton';

// Separate async components for streaming
async function StatsGrid() {
  const stats = await fetchStats().catch(() => ({ totalEmployees: 0, presentToday: 0, absentToday: 0 }));

  return (
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
        trend={`${calculateAttendancePercentage(stats.presentToday, stats.totalEmployees)}% attendance rate`}
        color="green"
      />
      <StatCard
        title="Absent Today"
        value={stats.absentToday}
        icon={<UserX size={24} />}
        trend={`${stats.absentToday} employees on leave`}
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
  );
}

async function RecentActivityGrid() {
  const recentAttendance = await fetchRecentAttendance().catch(() => []);

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: 'var(--muted)', fontSize: '0.8rem', color: 'var(--muted-foreground)', textAlign: 'left' }}>
          <tr>
            <th style={{ padding: '1rem' }}>EMPLOYEE</th>
            <th style={{ padding: '1rem' }}>DATE</th>
            <th style={{ padding: '1rem' }}>STATUS</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '0.9rem' }}>
          {recentAttendance.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>No recent activity</td>
            </tr>
          ) : (
            recentAttendance.map((rec: { id: number; employee_name: string; date: string; status: string }) => (
              <tr key={rec.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', fontWeight: '600' }}>{rec.employee_name}</td>
                <td style={{ padding: '1rem', color: 'var(--muted-foreground)' }}>{formatDate(rec.date)}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    color: rec.status === 'PRESENT' ? '#166534' : '#991b1b',
                    background: rec.status === 'PRESENT' ? '#dcfce7' : '#fee2e2',
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700'
                  }}>
                    {rec.status === 'PRESENT' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  return (
    <div>
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

      <Suspense fallback={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      }>
        <StatsGrid />
      </Suspense>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '3rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Recent Activity</h3>
          <Suspense fallback={<TableSkeleton />}>
            <RecentActivityGrid />
          </Suspense>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/employees" style={{ textDecoration: 'none' }}>
              <QuickActionCard>Add New Employee</QuickActionCard>
            </Link>
            <Link href="/attendance" style={{ textDecoration: 'none' }}>
              <QuickActionCard>Mark Attendance</QuickActionCard>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
