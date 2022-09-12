const API_KEY = '5e15346c28a348cc1967df2abcca1574';
const API_BASE = 'https://api.themoviedb.org/3/';

const basicFetch = async (endPoint) => {
    const req = await fetch(`${API_BASE}${endPoint}`);
    const json = await req.json();
    return json
}

const sortPage = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export default {
    getHomeMoviesList: async () => {
        return [
            {
              slug: 'originals',
                title: 'Originais',
                items: await basicFetch(`discover/tv?api_key=${API_KEY}&with_network=213&language=pt-BR&page=${sortPage(1, 4)}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`trending/movie/week?api_key=${API_KEY}&language=pt-BR&page=${sortPage(1, 8)}`)
            },
            {
              slug: 'top_rated',
              title: 'Mais Votados',
              items: await basicFetch(`movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=${sortPage(1, 10)}`)
            },
            {
              slug: 'action',
              title: 'Ação',
              items: await basicFetch(`discover/movie?api_key=${API_KEY}&with_genres=28&language=pt-BR&page=${sortPage(1, 10)}`)
            },
            {
              slug: 'comedy',
              title: 'Comédia',
              items: await basicFetch(`discover/movie?api_key=${API_KEY}&with_genres=35&language=pt-BR&page=${sortPage(1, 10)}`)
            },
            {
              slug: 'documentary',
              title: 'Documentário',
              items: await basicFetch(`discover/movie?api_key=${API_KEY}&with_genres=99&language=pt-BR&page=${sortPage(1, 10)}`)
            },
            {
              slug: 'family',
              title: 'Familia',
              items: await basicFetch(`discover/movie?api_key=${API_KEY}&with_genres=10751&language=pt-BR&page=${sortPage(1, 10)}`)
            },
            {
              slug: 'horror',
              title: 'Terror',
              items: await basicFetch(`discover/movie?api_key=${API_KEY}&with_genres=27&language=pt-BR&page=${sortPage(1, 10)}`)
            },
        ]
    },

    getMovieInfo: async (movieId, type) => {
      let info = {};

        if(movieId) {
          switch (type) {
            case 'movie':
              info = await basicFetch(`movie/${movieId}?api_key=${API_KEY}&language=pt-BR`)
              break;
            case 'tv':
              info = await basicFetch(`tv/${movieId}?api_key=${API_KEY}&language=pt-BR`)
              break;

            default:
              break;
          }
        }

      return info
    }
}
