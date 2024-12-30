'use client'

import { useTranslations } from 'next-intl'
import {
  FaUsers,
  FaMicrophone,
  FaCalendarAlt,
  FaDollarSign
} from 'react-icons/fa'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const COLORS = ['#92400E', '#B45309', '#D97706', '#F59E0B']

export default function DashboardPage() {
  const t = useTranslations('admin')

  const kpis = [
    { 
      icon: FaCalendarAlt, 
      label: 'totalEvents', 
      value: '24', 
      change: '+3',
      color: 'amber-700' 
    },
    { 
      icon: FaUsers, 
      label: 'totalAttendees', 
      value: '1,234', 
      change: '+123',
      color: 'amber-600' 
    },
    { 
      icon: FaMicrophone, 
      label: 'totalSpeakers', 
      value: '56', 
      change: '+5',
      color: 'amber-500' 
    },
    { 
      icon: FaDollarSign, 
      label: 'totalRevenue', 
      value: '$12,345', 
      change: '+$1,234',
      color: 'amber-400' 
    }
  ]

  const attendanceData = [
    { month: 'Jan', attendees: 65 },
    { month: 'Feb', attendees: 85 },
    { month: 'Mar', attendees: 120 },
    { month: 'Apr', attendees: 90 },
    { month: 'May', attendees: 150 },
    { month: 'Jun', attendees: 180 }
  ]

  const eventTypeData = [
    { name: 'Tech', value: 40 },
    { name: 'Business', value: 30 },
    { name: 'Design', value: 20 },
    { name: 'Other', value: 10 }
  ]

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div 
            key={kpi.label}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{t(kpi.label)}</p>
                <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                <p className={`text-sm ${
                  kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.change} {t('fromLastMonth')}
                </p>
              </div>
              <kpi.icon className={`w-12 h-12 text-${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{t('attendanceTrend')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="attendees" 
                  stroke="#92400E" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Types Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{t('eventTypes')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {eventTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 