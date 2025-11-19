import { BookOpen, Search, Filter, Grid, List, Download, Play, FileText, Music } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import { RESOURCE_CATEGORIES } from '@/utils/constants';

const Resources = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'latest'
  });

  const mockResources = [
    {
      id: 1,
      title: 'Women\'s Empowerment Principles',
      description: 'A comprehensive guide to women\'s empowerment principles and practices from the UN Global Compact.',
      category: 'Empowerment',
      author: 'UN Global Compact',
      downloads: 2450,
      createdAt: '2023-03-08',
      downloadUrl: 'https://unglobalcompact.org/take-action/action/womens-principles',
      fileType: 'PDF'
    },
    {
      id: 2,
      title: 'Gender Equality and Women\'s Empowerment',
      description: 'World Bank gender strategy update for accelerating equality and empowerment.',
      category: 'Research',
      author: 'World Bank',
      downloads: 1890,
      createdAt: '2023-09-15',
      downloadUrl: 'https://www.worldbank.org/en/topic/gender/brief/gender-strategy-update-2024-30-accelerating-equality-and-empowerment-for-all',
      fileType: 'PDF'
    },
    {
      id: 3,
      title: 'World Bank Gender Strategy',
      description: 'Revised World Bank Gender Strategy for accelerating equality and empowerment.',
      category: 'Research',
      author: 'World Bank',
      downloads: 3200,
      createdAt: '2023-11-20',
      downloadUrl: 'https://documents1.worldbank.org/curated/en/820851467992505410/pdf/102114-REVISED-PUBLIC-WBG-Gender-Strategy.pdf',
      fileType: 'PDF'
    },
    {
      id: 4,
      title: 'Gender and Financial Inclusion',
      description: 'ILO resource on gender and financial inclusion strategies.',
      category: 'Finance',
      author: 'International Labour Organization',
      downloads: 1650,
      createdAt: '2023-07-12',
      downloadUrl: 'https://www.ilo.org/resource/other/gender-and-financial-inclusion',
      fileType: 'PDF'
    },
    {
      id: 5,
      title: 'ILO Action Plan for Gender Equality',
      description: 'UN Women publication of ILO action plan for gender equality 2022-2025.',
      category: 'Workplace',
      author: 'UN Women & ILO',
      downloads: 2780,
      createdAt: '2023-06-01',
      downloadUrl: 'https://www.unwomen.org/sites/default/files/2022-11/ILO-action-plan-for-gender-equality-2022-2025-en.pdf',
      fileType: 'PDF'
    },
    {
      id: 6,
      title: 'Sexual and Reproductive Health and Rights',
      description: 'OHCHR comprehensive guide on women\'s sexual and reproductive health and rights.',
      category: 'Health',
      author: 'Office of the High Commissioner for Human Rights',
      downloads: 4120,
      createdAt: '2023-05-28',
      downloadUrl: 'https://www.ohchr.org/en/women/sexual-and-reproductive-health-and-rights',
      fileType: 'PDF'
    },
    {
      id: 7,
      title: 'Overcoming Self-Doubt as a Woman',
      description: 'Powerful motivational video addressing self-doubt and building confidence in women.',
      category: 'Motivation',
      author: 'Women Empowerment Channel',
      downloads: 2850,
      createdAt: '2024-01-15',
      downloadUrl: 'https://youtu.be/bzNke_GYGHg?si=0w5uFVYkiPqPd0Mq',
      fileType: 'Video',
      videoId: 'bzNke_GYGHg'
    },
    {
      id: 8,
      title: 'Women\'s Motivation and Empowerment',
      description: 'Inspiring video series focused on women\'s motivation and personal growth.',
      category: 'Motivation',
      author: 'EmpowerHer',
      downloads: 3200,
      createdAt: '2024-01-10',
      downloadUrl: 'https://youtu.be/RLTgnOuYb6o?si=3abnleCLISSyqah8',
      fileType: 'Video',
      videoId: 'RLTgnOuYb6o'
    },
    {
      id: 9,
      title: 'Breaking Barriers: Women in Leadership',
      description: 'Documentary-style video exploring women breaking barriers in leadership roles.',
      category: 'Leadership',
      author: 'Women Leaders Network',
      downloads: 1950,
      createdAt: '2024-01-08',
      downloadUrl: 'https://youtu.be/VF4ZyJRUxk8?si=NVvDYaEqt84aEzRz',
      fileType: 'Video',
      videoId: 'VF4ZyJRUxk8'
    },
    {
      id: 10,
      title: 'Success Stories: Women Entrepreneurs',
      description: 'Inspiring success stories of women entrepreneurs overcoming challenges.',
      category: 'Entrepreneurship',
      author: 'Business Women Hub',
      downloads: 2400,
      createdAt: '2024-01-05',
      downloadUrl: 'https://youtu.be/gqX0tbk6v5c?si=Jm9qqVNu1xGC5bR4',
      fileType: 'Video',
      videoId: 'gqX0tbk6v5c'
    },
    {
      id: 11,
      title: 'Daily Women Motivation',
      description: 'Short motivational video for women to start their day with confidence.',
      category: 'Motivation',
      author: 'Women Empowerment Daily',
      downloads: 4100,
      createdAt: '2024-01-03',
      downloadUrl: 'https://youtube.com/shorts/Ekm9v4SiRlM?si=jvDqH4gPl2Tdyjl0',
      fileType: 'Video',
      videoId: 'Ekm9v4SiRlM'
    },
    {
      id: 12,
      title: 'Empowerment Music Mix',
      description: 'Uplifting music compilation for women\'s empowerment and motivation.',
      category: 'Music',
      author: 'Women Power Beats',
      downloads: 3200,
      createdAt: '2024-01-15',
      downloadUrl: 'https://youtu.be/-a1qTzh16hY?si=vYelCcJ6xXRrRZRw',
      fileType: 'Music',
      videoId: '-a1qTzh16hY'
    },
    {
      id: 13,
      title: 'Strong Women Anthem',
      description: 'Inspiring musical anthem celebrating the strength and resilience of women.',
      category: 'Music',
      author: 'EmpowerHer Music',
      downloads: 2800,
      createdAt: '2024-01-12',
      downloadUrl: 'https://youtu.be/h3h035Eyz5A?si=dufF8cIjeDHSCqrJ',
      fileType: 'Music',
      videoId: 'h3h035Eyz5A'
    },
    {
      id: 14,
      title: 'Rise Above - Women\'s Motivation',
      description: 'Motivational music track encouraging women to rise above challenges.',
      category: 'Music',
      author: 'Women Rise Music',
      downloads: 3500,
      createdAt: '2024-01-10',
      downloadUrl: 'https://youtu.be/SeiGUkOAes8?si=RZB1S8g5ZGSGx4A3',
      fileType: 'Music',
      videoId: 'SeiGUkOAes8'
    },
    {
      id: 15,
      title: 'Unbreakable Spirit',
      description: 'Powerful music celebrating the unbreakable spirit of women worldwide.',
      category: 'Music',
      author: 'Spirit of Women',
      downloads: 2900,
      createdAt: '2024-01-08',
      downloadUrl: 'https://youtu.be/iawgB2CDCrw?si=PWQARYdYeSiNm26F',
      fileType: 'Music',
      videoId: 'iawgB2CDCrw'
    },
    {
      id: 16,
      title: 'Women\'s Journey Soundtrack',
      description: 'Emotional soundtrack accompanying women\'s journeys of growth and empowerment.',
      category: 'Music',
      author: 'Journey Sounds',
      downloads: 2600,
      createdAt: '2024-01-05',
      downloadUrl: 'https://youtu.be/mwL1cohnHNE?si=gVYcO2UstAgtKe-G',
      fileType: 'Music',
      videoId: 'mwL1cohnHNE'
    },
    {
      id: 17,
      title: 'Triumph of Women',
      description: 'Triumphant musical celebration of women\'s achievements and victories.',
      category: 'Music',
      author: 'Victory Notes',
      downloads: 3100,
      createdAt: '2024-01-03',
      downloadUrl: 'https://youtu.be/1fBZnTXQBj4?si=xHOpQ7oJXuXXh8uR',
      fileType: 'Music',
      videoId: '1fBZnTXQBj4'
    }
  ];

  // Group resources by type
  const documents = mockResources.filter(r => r.fileType === 'PDF');
  const videos = mockResources.filter(r => r.fileType === 'Video');
  const music = mockResources.filter(r => r.fileType === 'Music');

  const handleDownload = (resource) => {
    // Open the resource URL in a new tab
    window.open(resource.downloadUrl, '_blank');
    const action = resource.fileType === 'Video' ? 'Watching' : resource.fileType === 'Music' ? 'Listening to' : 'Opening';
    toast.success(`${action}: ${resource.title}`);
  };

  const ResourceSection = ({ title, resources, bgColor, icon: Icon }) => (
    <div className={`mb-12 ${bgColor}`}>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {resources.length} {resources.length === 1 ? 'resource' : 'resources'} available
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {resources.map(resource => (
          <Card key={resource.id} hover className="transform hover:scale-105 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                {resource.fileType === 'Video' ? (
                  <div className="relative">
                    <Play className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <Play className="h-1.5 w-1.5 text-white ml-0.5" />
                    </div>
                  </div>
                ) : resource.fileType === 'Music' ? (
                  <div className="relative">
                    <Music className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                      <Music className="h-1.5 w-1.5 text-white" />
                    </div>
                  </div>
                ) : (
                  <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                )}
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                  {resource.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {resource.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>By {resource.author}</span>
                <span>{resource.downloads} {resource.fileType === 'Video' ? 'views' : resource.fileType === 'Music' ? 'plays' : 'downloads'}</span>
              </div>
              <Button
                fullWidth
                icon={resource.fileType === 'Video' ? Play : resource.fileType === 'Music' ? Music : Download}
                onClick={() => handleDownload(resource)}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg"
              >
                {resource.fileType === 'Video' ? 'Watch Video' : resource.fileType === 'Music' ? 'Listen to Music' : `Download ${resource.fileType}`}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Educational Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover curated resources to advance your personal and professional journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search resources..."
                icon={Search}
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              {RESOURCE_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('grid')}
                icon={Grid}
              />
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('list')}
                icon={List}
              />
            </div>
          </div>
        </div>

        {/* Resources Sections */}
        {documents.length > 0 && (
          <ResourceSection
            title="Educational Documents"
            resources={documents}
            bgColor="bg-blue-50 dark:bg-blue-900/10"
            icon={FileText}
          />
        )}

        {videos.length > 0 && (
          <ResourceSection
            title="Motivational Videos"
            resources={videos}
            bgColor="bg-red-50 dark:bg-red-900/10"
            icon={Play}
          />
        )}

        {music.length > 0 && (
          <ResourceSection
            title="Inspirational Music"
            resources={music}
            bgColor="bg-green-50 dark:bg-green-900/10"
            icon={Music}
          />
        )}
      </div>
    </div>
  );
};

export default Resources;