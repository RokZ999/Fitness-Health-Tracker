import { SECRET_API_KEY } from '$env/static/private';
import type { Article, NewsApiResponse } from '$lib/types/Article';


export async function load({ url }): Promise<{ code:String,articles: Article[], totalResults: number }> {
  let page: number = (Number(url.searchParams.get('page')) || 0);
  page++;


  const pageSize = 3;
  const apiKey = SECRET_API_KEY 
  const response = await fetch(`https://newsapi.org/v2/everything?q=gym&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
  const data: NewsApiResponse = await response.json();
  console.log( data.code == "rateLimited")

  return {
    code: data.code,
    articles: data.articles,
    totalResults: data.totalResults
  };
}