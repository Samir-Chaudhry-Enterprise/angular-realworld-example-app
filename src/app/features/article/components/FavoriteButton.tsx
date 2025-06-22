import React, { useState } from 'react';

interface Article {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
}

interface FavoriteButtonProps {
  article: Article;
  onToggle: (favorited: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  article,
  onToggle,
  children,
  className = ''
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFavorite = async () => {
    setIsSubmitting(true);

    try {
      const isAuthenticated = false; // Placeholder - needs UserService equivalent
      
      if (!isAuthenticated) {
        console.log('User not authenticated, should redirect to /register');
        setIsSubmitting(false);
        return;
      }

      let updatedArticle;
      if (!article.favorited) {
        updatedArticle = await mockFavoriteAPI(article.slug);
      } else {
        updatedArticle = await mockUnfavoriteAPI(article.slug);
      }

      onToggle(!article.favorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mockFavoriteAPI = async (slug: string) => {
    console.log(`Mock API: Favoriting article ${slug}`);
    return Promise.resolve({ favorited: true });
  };

  const mockUnfavoriteAPI = async (slug: string) => {
    console.log(`Mock API: Unfavoriting article ${slug}`);
    return Promise.resolve({ favorited: false });
  };

  const buttonClasses = [
    'btn',
    'btn-sm',
    isSubmitting ? 'disabled' : '',
    article.favorited ? 'btn-primary' : 'btn-outline-primary',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={toggleFavorite}
      disabled={isSubmitting}
    >
      <i className="ion-heart"></i> {children}
    </button>
  );
};
