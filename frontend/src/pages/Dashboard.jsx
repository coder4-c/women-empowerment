import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
  BookOpen,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Clock,
  Target,
  Heart,
  AlertTriangle,
  Mail
} from 'lucide-react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

const Dashboard = () => {
  const { user } = useAuth();

  const handleBookTherapy = () => {
    // In a real application, this would open a booking form or send an email
    const subject = encodeURIComponent('Therapy Session Booking Request');
    const body = encodeURIComponent(`Hello,

I would like to book a therapy session. Here are my details:

Name: ${user?.name}
Email: ${user?.email}
Region: ${user?.region || 'Not specified'}

Please let me know the available time slots and how to proceed.

Best regards,
${user?.name}`);

    const mailtoLink = `mailto:therapy@womenempowerment.org?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');

    toast.success('Opening email client to book therapy session');
  };

  const stats = [
    {
      title: 'Resources Downloaded',
      value: '0',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Events Attended',
      value: '0',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Active Mentorships',
      value: '0',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Progress Score',
      value: '0%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      type: 'welcome',
      title: 'Welcome to Women Empowerment Platform!',
      time: 'Just now',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening with your empowerment journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    {stat.title === 'Events Attended' && stat.value === '0' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        No meetings attended yet
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-primary-100 dark:bg-primary-900/20 p-2 rounded-lg">
                      <Icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium">
                        {activity.title}
                      </p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                fullWidth
                variant="outline"
                icon={BookOpen}
                as={Link}
                to="/resources"
              >
                Browse Resources
              </Button>
              <Button
                fullWidth
                variant="outline"
                icon={Calendar}
                as={Link}
                to="/events"
              >
                View Upcoming Events
              </Button>
              <Button
                fullWidth
                variant="outline"
                icon={Users}
                as={Link}
                to="/mentorship"
              >
                Find Mentors
              </Button>
              <Button
                fullWidth
                variant="outline"
                icon={Target}
                as={Link}
                to="/goals/new"
              >
                Set New Goal
              </Button>
              <Button
                fullWidth
                variant="outline"
                icon={Heart}
                onClick={handleBookTherapy}
              >
                Book Therapy Session
              </Button>
            </div>
          </Card>

          {/* Trauma Support */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Trauma Support
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                  <h3 className="font-medium text-red-800 dark:text-red-200">
                    Need Support?
                  </h3>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  If you're experiencing trauma or need someone to talk to, we're here to help.
                </p>
                <Button
                  fullWidth
                  variant="outline"
                  icon={Heart}
                  className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                >
                  Report Trauma
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;