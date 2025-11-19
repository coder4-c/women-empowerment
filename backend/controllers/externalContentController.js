import externalContentService from '../services/externalContentService.js';

// Get latest news and articles
const getLatestNews = async (req, res) => {
  try {
    const news = await externalContentService.fetchLatestNews();
    res.json({
      success: true,
      data: news,
      count: news.length
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest news',
      error: error.message
    });
  }
};

// Get YouTube videos
const getYouTubeVideos = async (req, res) => {
  try {
    const videos = await externalContentService.fetchYouTubeVideos();
    res.json({
      success: true,
      data: videos,
      count: videos.length
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch YouTube videos',
      error: error.message
    });
  }
};

// Get research resources
const getResearchResources = async (req, res) => {
  try {
    const resources = await externalContentService.fetchResearchResources();
    res.json({
      success: true,
      data: resources,
      count: resources.length
    });
  } catch (error) {
    console.error('Error fetching research resources:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch research resources',
      error: error.message
    });
  }
};

// Search content
const searchContent = async (req, res) => {
  try {
    const { q: query, type = 'all' } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const results = await externalContentService.searchContent(query, type);
    res.json({
      success: true,
      data: results,
      count: results.length,
      query,
      type
    });
  } catch (error) {
    console.error('Error searching content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search content',
      error: error.message
    });
  }
};

// Get trending topics
/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTrendingTopics = async (req, res) => {
  try {
    const topics = await externalContentService.getTrendingTopics();
    res.json({
      success: true,
      data: topics,
      count: topics.length
    });
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending topics',
      error: error.message
    });
  }
};

// Get all external content combined
/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllExternalContent = async (req, res) => {
  try {
    const [news, videos, research, topics] = await Promise.all([
      externalContentService.fetchLatestNews(),
      externalContentService.fetchYouTubeVideos(),
      externalContentService.fetchResearchResources(),
      externalContentService.getTrendingTopics()
    ]);

    res.json({
      success: true,
      data: {
        news,
        videos,
        research,
        topics
      },
      counts: {
        news: news.length,
        videos: videos.length,
        research: research.length,
        topics: topics.length
      }
    });
  } catch (error) {
    console.error('Error fetching all external content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch external content',
      error: error.message
    });
  }
};

export default {
  getLatestNews,
  getYouTubeVideos,
  getResearchResources,
  searchContent,
  getTrendingTopics,
  getAllExternalContent
};