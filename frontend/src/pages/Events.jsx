import { Calendar, Users, Clock, MapPin, ExternalLink, RefreshCw, X, User, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import toast from 'react-hot-toast';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock events data for now - can be replaced with API call
      const mockEvents = [
        {
          id: 'event_1',
          title: 'Women in Leadership Workshop',
          description: 'Join us for an interactive workshop on developing leadership skills and strategies for career advancement.',
          date: '2025-12-15',
          time: '10:00 AM - 2:00 PM',
          location: 'Virtual Event',
          category: 'Workshop',
          capacity: 50,
          registered: 23,
          image: '/api/placeholder/400/250',
          registrationLink: '/events/register'
        },
        {
          id: 'event_2', 
          title: 'Networking Coffee Chat',
          description: 'Connect with fellow women entrepreneurs and professionals in a relaxed, informal setting.',
          date: '2025-12-20',
          time: '3:00 PM - 5:00 PM',
          location: 'Community Center, Downtown',
          category: 'Networking',
          capacity: 30,
          registered: 18,
          image: '/api/placeholder/400/250',
          registrationLink: '/events/register'
        },
        {
          id: 'event_3',
          title: 'Entrepreneurship Pitch Night',
          description: 'Watch women-led startups pitch their innovative ideas to investors and industry experts.',
          date: '2025-12-28',
          time: '6:00 PM - 9:00 PM',
          location: 'Tech Hub Auditorium',
          category: 'Business',
          capacity: 100,
          registered: 67,
          image: '/api/placeholder/400/250',
          registrationLink: '/events/register'
        }
      ];
      
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Failed to load events');
      toast.error('Failed to load events');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
    setRegistrationData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    if (!registrationData.name || !registrationData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update event registration count
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === selectedEvent.id 
            ? { ...event, registered: event.registered + 1 }
            : event
        )
      );

      toast.success(`Successfully registered for ${selectedEvent.title}!`);
      setShowRegistrationModal(false);
      setSelectedEvent(null);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const isUpcoming = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    return eventDate >= today;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Events & Workshops
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Join our upcoming workshops, networking events, and educational sessions
              </p>
            </div>
            <Button
              onClick={fetchEvents}
              disabled={loading}
              icon={RefreshCw}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary-600 mr-3" />
            <span className="text-gray-600 dark:text-gray-300">Loading events...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 dark:text-red-400 mb-4">
              {error}
            </div>
            <Button onClick={fetchEvents} icon={RefreshCw}>
              Try Again
            </Button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {events.filter(event => isUpcoming(event.date)).length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Upcoming Events
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Check back soon for new events and workshops.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.filter(event => isUpcoming(event.date)).map(event => (
                  <Card key={event.id} hover className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Calendar className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {Math.round((event.registered / event.capacity) * 100)}% full
                      </p>
                    </div>

                    <Button
                      fullWidth
                      icon={ExternalLink}
                      onClick={() => handleRegister(event)}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                    >
                      Register Now
                    </Button>
                  </Card>
                ))}
              </div>
            )}

            {/* Past Events Section */}
            {events.filter(event => !isUpcoming(event.date)).length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.filter(event => !isUpcoming(event.date)).map(event => (
                    <Card key={event.id} className="p-6 opacity-75">
                      <div className="flex items-start justify-between mb-4">
                        <Calendar className="h-8 w-8 text-gray-400" />
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {event.description}
                      </p>

                      <div className="space-y-1 text-sm text-gray-400">
                        <div>{event.date}</div>
                        <div>{event.location}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Registration Modal */}
        {showRegistrationModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Register for Event
                </h3>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                    {selectedEvent.title}
                  </h4>
                  <div className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {selectedEvent.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {selectedEvent.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedEvent.location}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <Input
                    label="Full Name *"
                    name="name"
                    value={registrationData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    icon={User}
                    required
                  />
                  
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={registrationData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    icon={Mail}
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={registrationData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    icon={Phone}
                  />
                  
                  <Input
                    label="Company/Organization"
                    name="company"
                    value={registrationData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={registrationData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Any special requirements or questions..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRegistrationModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Registering...' : 'Register Now'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;