import { useState } from 'react';
import { format } from 'date-fns';
import { User, Calendar, Quote, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';

const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'financial': 'bg-warm-100 text-warm-800 dark:bg-warm-900 dark:text-warm-300',
      'mental health': 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
      'body positivity': 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
      'career advancement': 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300',
      'general': 'bg-vibrant-100 text-vibrant-800 dark:bg-vibrant-900 dark:text-vibrant-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <Quote className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(testimonial.category)}`}>
            {testimonial.category.replace(' ', ' ')}
          </span>
        </div>

        <div className="mb-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </h3>
            {testimonial.country && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3 mr-1" />
                {testimonial.country}
              </div>
            )}
          </div>

          <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            <p className="mb-2">
              {isExpanded ? testimonial.story : truncateText(testimonial.story)}
            </p>

            {testimonial.story.length > 300 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                <span className="flex items-center text-xs font-medium">
                  {isExpanded ? (
                    <>
                      Read Less <ChevronUp className="h-3 w-3 ml-1" />
                    </>
                  ) : (
                    <>
                      Read Full Story <ChevronDown className="h-3 w-3 ml-1" />
                    </>
                  )}
                </span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{testimonial.anonymous ? 'Anonymous' : testimonial.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(testimonial.createdAt), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;