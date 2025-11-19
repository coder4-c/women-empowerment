import { Newspaper, ExternalLink, RefreshCw, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import toast from 'react-hot-toast';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/external/news');
      const data = await response.json();

      if (data.success) {
        setNews(data.data);
      } else {
        setError('Failed to load news');
        toast.error('Failed to load news');
      }
    } catch (err) {
      setError('Network error');
      toast.error('Network error loading news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleReadMore = (article) => {
    if (article.url) {
      window.open(article.url, '_blank');
      toast.success(`Opening: ${article.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Latest News
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Stay updated with the latest women's empowerment news and articles
              </p>
            </div>
            <Button
              onClick={fetchNews}
              disabled={loading}
              icon={RefreshCw}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Refresh
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-primary-600 mr-3" />
            <span className="text-gray-600 dark:text-gray-300">Loading news...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 dark:text-red-400 mb-4">
              {error}
            </div>
            <Button onClick={fetchNews} icon={RefreshCw}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No News Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Check back later for the latest women's empowerment news.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(article => (
              <Card key={article.id} hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Newspaper className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.summary || article.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {article.publishedAt}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Newspaper className="h-4 w-4 mr-2" />
                    Source: {article.source}
                  </div>
                </div>

                <Button
                  fullWidth
                  icon={ExternalLink}
                  onClick={() => handleReadMore(article)}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                >
                  Read Full Article
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;