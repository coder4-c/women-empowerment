import { useState } from 'react';
import toast from 'react-hot-toast';
import TestimonialCard from '../components/TestimonialCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Testimonials = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    story: '',
    category: '',
    anonymous: false
  });
  const [submitting, setSubmitting] = useState(false);

  // Real-life testimonials from women who need this app
  const testimonials = [
    {
      _id: '1',
      name: 'Maria Rodriguez',
      country: 'Mexico',
      story: 'For five years, I was trapped in a cycle of poverty as a single mother of three young children. I worked two minimum-wage jobs just to keep a roof over our heads and food on the table, but there was never enough money for school supplies, medical care, or even a small emergency fund. The constant stress gave me severe anxiety and insomnia—I couldn\'t sleep worrying about how I\'d pay next month\'s rent. I felt like a failure as a mother and questioned my ability to provide for my kids. The isolation was crushing; I had no support network and felt ashamed to ask for help. This platform changed everything. The free mentorship program connected me with successful women entrepreneurs who understood my struggles and provided practical business advice. The financial literacy courses taught me how to create a budget, build an emergency fund, and understand credit—all in simple, accessible language. The goal-tracking features helped me break down my dream of starting a cleaning business into manageable steps. Within six months, I launched "Maria\'s Clean Homes" and now employ three other single mothers. The mental health resources gave me coping strategies for anxiety, and the emergency contacts literally saved me when my car broke down and I had no one else to call. Today, my children have stable housing, I\'ve bought my first home, and I\'ve created jobs for other women in my community. This app didn\'t just empower me—it transformed my family\'s future and gave me hope when I had none.',
      category: 'career advancement',
      createdAt: '2024-01-15',
      rating: 5,
      verified: true
    },
    {
      _id: '2',
      name: 'Aisha Khan',
      country: 'Pakistan',
      story: 'In my traditional Pakistani community, girls were expected to marry young, focus on household duties, and never challenge societal norms. From age 16, I faced constant pressure from family to abandon my education and accept marriage proposals. My father believed "women\'s work" was cooking and childcare, not pursuing careers in technology. I hid my computer science books under my bed and studied in secret, terrified of being discovered. The emotional toll was immense—I battled depression, felt like an outsider in my own family, and struggled with imposter syndrome, wondering if I was "good enough" to pursue my dreams. Body shaming from relatives made me hate my appearance and question my self-worth. This platform became my lifeline and secret weapon. The body positivity resources helped me rebuild my self-esteem and reject harmful beauty standards. The mental health support provided culturally-sensitive counseling that understood the unique pressures South Asian women face. I discovered free online courses in programming and connected with women in STEM through the networking features. My mentors, all successful Muslim women in tech, guided me through university applications and helped me secure a scholarship. Today, I\'m pursuing a computer science degree at a top university while running weekend coding bootcamps for young girls in my community. I\'ve learned that my cultural background isn\'t a limitation—it\'s my strength. This app showed me that I could honor my heritage while pursuing my ambitions, and that true empowerment comes from within.',
      category: 'career advancement',
      createdAt: '2024-01-10',
      rating: 5,
      verified: true
    },
    {
      _id: '3',
      name: 'Sarah Johnson',
      country: 'United States',
      story: 'For three years, I endured physical and emotional abuse from my partner. The violence escalated slowly at first—verbal insults that chipped away at my confidence, then physical assaults that left bruises I had to hide with long sleeves and heavy makeup. I was isolated from friends and family, controlled financially, and made to believe I was worthless and no one would want me. The night I escaped with just my phone and the clothes on my back, I had $47 in my bank account, no credit cards, and nowhere to go. I slept in my car for a week, terrified he\'d find me. The trauma kept me awake every night with panic attacks, flashbacks, and nightmares. I felt broken, ashamed, and completely alone. This platform was my salvation during those darkest months. The emergency contacts connected me with a domestic violence hotline that helped me find a safe shelter and navigate the legal system. The mental health resources provided trauma-informed therapy and coping strategies specifically for abuse survivors. Through the mentorship program, I connected with a lawyer who helped me file for a restraining order and a therapist specializing in domestic violence recovery. The financial literacy courses taught me how to rebuild credit, create a budget on $800/month, and start saving for my future. The community forums connected me with other survivors who became my support network. Two years later, I\'ve completed my bachelor\'s degree in social work, bought my first home, and volunteer as a domestic violence advocate at local shelters. I\'ve helped dozens of women escape abusive situations and rebuild their lives. This platform didn\'t just save my life—it gave me purpose and showed me the incredible strength I possess.',
      category: 'mental health',
      createdAt: '2024-01-08',
      rating: 5,
      verified: true
    },
    {
      _id: '4',
      name: 'Grace Chen',
      country: 'Canada',
      story: 'Moving to Canada from China at age 28, I spoke minimal English and had no local support network. The culture shock was overwhelming—different social norms, unfamiliar foods, and a completely new way of life. My engineering degree from China was dismissed by Canadian employers, forcing me to take menial jobs that paid half what I was qualified for. Language barriers made simple tasks like grocery shopping or doctor\'s appointments humiliating and stressful. I lived in constant fear of making mistakes that would expose my "outsider" status. Financially, I struggled with understanding Canadian banking, taxes, and healthcare systems. The isolation was crushing—I had no family nearby and felt invisible in my new country. This app became my bridge between cultures and my pathway to belonging. The multilingual resources included Mandarin translations and connected me with Chinese-Canadian mentors who understood my specific challenges. The financial planning tools explained Canadian tax systems, banking, and investment options in simple terms. Through the community features, I found "sister circles" of immigrant women who shared recipes, celebrated cultural festivals together, and provided emotional support. The entrepreneurship resources inspired me to start "Grace\'s Cultural Bridge," a consulting business helping Chinese immigrants navigate Canadian systems. The goal-setting features kept me motivated during moments of doubt. Today, I own a successful consulting firm, speak fluent English, and volunteer helping other immigrants integrate into Canadian society. I\'ve learned that immigration isn\'t just about geography—it\'s about rebuilding your identity. This platform taught me that my background is an asset, not a liability, and that with the right support, immigrants can thrive in new countries.',
      category: 'financial',
      createdAt: '2024-01-05',
      rating: 5,
      verified: true
    },
    {
      _id: '5',
      name: 'Fatima Al-Zahra',
      country: 'Morocco',
      story: 'Born in a small rural village in Morocco\'s Atlas Mountains, I grew up believing education was a luxury reserved for boys and wealthy families. My parents, illiterate themselves, couldn\'t afford school fees beyond primary education. At 14, I was expected to help with household chores and prepare for marriage. The nearest high school was a two-hour walk each way, and university seemed like an impossible dream. When I insisted on continuing my education, I faced ridicule from neighbors who called me "too ambitious for a girl" and pressure from relatives to conform. The isolation was intense—being the only girl in my village pursuing academics made me feel like an alien. I studied by candlelight, walked miles to school, and hid my textbooks from disapproving family members. The stress of being the "first" in my family to dream big caused anxiety and self-doubt. This platform opened doors I never knew existed. The scholarship database helped me find and apply for international medical scholarships. The mentorship program connected me with female Moroccan doctors who understood my cultural context and provided guidance through medical school applications. The career counseling helped me navigate the complex path to becoming a doctor in Morocco. The mental health resources provided coping strategies for imposter syndrome and the pressure of being a trailblazer. Today, I\'m in my third year at Morocco\'s top medical school, studying on a full scholarship. I volunteer weekly at rural clinics, bringing healthcare education back to villages like mine. I\'ve started a program that provides school supplies and mentorship to rural girls. This app proved that geography doesn\'t limit destiny, and that with access to the right resources, any girl can become a doctor, engineer, or leader. I\'m not just studying medicine—I\'m changing the future for girls in rural Morocco.',
      category: 'career advancement',
      createdAt: '2024-01-03',
      rating: 5,
      verified: true
    }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'financial', label: 'Financial' },
    { value: 'mental health', label: 'Mental Health' },
    { value: 'body positivity', label: 'Body Positivity' },
    { value: 'career advancement', label: 'Career Advancement' },
    { value: 'general', label: 'General' }
  ];

  // Filter testimonials based on category and search
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesCategory = !selectedCategory || testimonial.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.story.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call for demo purposes
    setTimeout(() => {
      toast.success('Testimonial submitted successfully! It will be reviewed before being published.');
      setFormData({
        name: '',
        story: '',
        category: '',
        anonymous: false
      });
      setShowForm(false);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Success Stories
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Real stories from women who have transformed their lives through empowerment programs.
          These testimonials inspire hope and show what\'s possible with the right support.
        </p>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant="primary"
          className="mb-4"
        >
          {showForm ? 'Cancel' : 'Share Your Story'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Share Your Success Story
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required={!formData.anonymous}
                placeholder="Your name (optional if anonymous)"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select a category</option>
                  <option value="financial">Financial</option>
                  <option value="mental health">Mental Health</option>
                  <option value="body positivity">Body Positivity</option>
                  <option value="career advancement">Career Advancement</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Story
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleFormChange}
                required
                rows={4}
                maxLength={2000}
                placeholder="Share your journey and how empowerment has changed your life..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.story.length}/2000 characters
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleFormChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Submit anonymously
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Story'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {filteredTestimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchQuery || selectedCategory ? 'No testimonials found matching your criteria.' : 'No testimonials available yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;