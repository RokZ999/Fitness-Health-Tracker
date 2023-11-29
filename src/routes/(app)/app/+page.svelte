<script lang="ts">
    import { onMount } from 'svelte';
    import type { NewsApiResponse, Article } from '../lib/article';
    import { Avatar, Paginator } from '@skeletonlabs/skeleton';
    import type { PaginationSettings } from '@skeletonlabs/skeleton';
  
    let articles: Article[] = [];
    let isLoading = true;
    let totalResults = 0;
    let paginationSettings: PaginationSettings = {
      page: 0,
      limit: 3,
      size: 3,
      amounts: [3],
    };
  
    const fetchNews = async (page: number) => {
      isLoading = true;
      const pageSize = 3;
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=gym&pageSize=${pageSize}&page=${page}&apiKey=04a008c68c984796b9e8de51780c6b4c`);
        const data: NewsApiResponse = await response.json();
        articles = data.articles;
        totalResults = data.totalResults;
        paginationSettings.size = totalResults;
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        isLoading = false;
      }
    };
  
    const onPageChange = (e: CustomEvent) => {
        let num: number = e.detail as number
        num++;       
        fetchNews(num);
    };
  
    onMount(() => fetchNews(1));
  
  </script>
  
  {#if isLoading}
    <div>Loading...</div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {#each articles as article}
        <a class="card card-hover overflow-hidden" href={article.url}>
          <header>
            <img src={article.urlToImage || 'default-image-url.jpg'} class="bg-black/50 w-full aspect-[21/9]" alt="Post" />
          </header>
          <div class="p-4 space-y-2">
            <h6 class="h6">{article.source.name}</h6>
            <h3 class="h4 line-clamp-2">{article.title}</h3>

            <article class="h-24 overflow-hidden">
                <p>{article.description}</p>
              </article>
          </div>
          <hr class="opacity-50" />
          <footer class="p-4 flex justify-start items-center space-x-4">
            <div class="flex-auto flex justify-between items-center">
                <h6 class="font-bold">
                    { article.author && article.author.length <= 20 ? article.author : 'Unknown Author' }
                  </h6>
                  
              <small>On {new Date(article.publishedAt).toLocaleDateString()}</small>
            </div>
          </footer>
        </a>
      {/each}
      
    </div>
    <div class="flex justify-center mt-4">
        <Paginator
        bind:settings={paginationSettings}
        on:page={onPageChange}
        showFirstLastButtons="{false}"
        showPreviousNextButtons="{true}"
        
        />
    </div>
  {/if}
  