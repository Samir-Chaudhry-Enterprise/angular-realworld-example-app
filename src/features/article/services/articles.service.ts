import { apiClient } from '../../../core/api/client';
import { Article, ArticleListConfig } from '../types';

export class ArticlesService {
  static async getArticles(config: ArticleListConfig): Promise<{ articles: Article[]; articlesCount: number }> {
    const params = new URLSearchParams();
    
    Object.entries(config.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const endpoint = config.type === 'feed' ? '/articles/feed' : '/articles';
    const response = await apiClient.get(`${endpoint}?${params}`);
    return response.data;
  }

  static async getArticle(slug: string): Promise<Article> {
    const response = await apiClient.get(`/articles/${slug}`);
    return response.data.article;
  }

  static async createArticle(article: Partial<Article>): Promise<Article> {
    const response = await apiClient.post('/articles', { article });
    return response.data.article;
  }

  static async updateArticle(slug: string, article: Partial<Article>): Promise<Article> {
    const response = await apiClient.put(`/articles/${slug}`, { article });
    return response.data.article;
  }

  static async deleteArticle(slug: string): Promise<void> {
    await apiClient.delete(`/articles/${slug}`);
  }

  static async favoriteArticle(slug: string): Promise<Article> {
    const response = await apiClient.post(`/articles/${slug}/favorite`);
    return response.data.article;
  }

  static async unfavoriteArticle(slug: string): Promise<Article> {
    const response = await apiClient.delete(`/articles/${slug}/favorite`);
    return response.data.article;
  }
}
