import type { Article, NewsApiResponse } from '$lib/types/Article';
import type { PageServerLoad } from './$types';

export async function load({ url }): Promise<{ articles: Article[], totalResults: number }> {
  const page = url.searchParams.get('page') || 1;
  const pageSize = 3;
  const apiKey = '04a008c68c984796b9e8de51780c6b4c';
  const response = await fetch(`https://newsapi.org/v2/everything?q=gym&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
  const data: NewsApiResponse = await response.json();
  
  return {
    articles: data.articles,
    totalResults: data.totalResults
  };
}
