<script lang="ts">
    import type { Article } from '$lib/types/Article';
  import { Avatar, Paginator } from '@skeletonlabs/skeleton';
  import type { PaginationSettings } from '@skeletonlabs/skeleton';
      import type { PageData } from './$types';

  export let data: PageData;

  export let articles: Article[] = data.articles;
  export let totalResults = data.totalResults;

  let paginationSettings: PaginationSettings = {
    page: 0,
    limit: 3,
    size: totalResults,
    amounts: [3],
  };

  const onPageChange = (e: CustomEvent) => {
    const num: number = e.detail;
    // Redirect to the new page with the updated page number
  };
</script>
  
  {#if articles.length === 0}
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
  