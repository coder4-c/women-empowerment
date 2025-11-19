import express from 'express';
const router = express.Router();
import externalContentController from '../controllers/externalContentController.js';

// Get all external content (news, videos, research, topics)
router.get('/all', externalContentController.getAllExternalContent);

// Get latest news and articles
router.get('/news', externalContentController.getLatestNews);

// Get YouTube videos
router.get('/videos', externalContentController.getYouTubeVideos);

// Get research resources
router.get('/research', externalContentController.getResearchResources);

// Search content
router.get('/search', externalContentController.searchContent);

// Get trending topics
router.get('/trending', externalContentController.getTrendingTopics);

export default router;