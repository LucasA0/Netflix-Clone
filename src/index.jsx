import { useEffect, useState } from 'react'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import './index.css'
import Tmdb from './services/Tmdb'
import MoviesArea from './components/MoviesArea'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'


function Index() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista de filmes e séries
      let moviesList = await Tmdb.getHomeMoviesList();
      setMovieList(moviesList)


      // pegando o featured
      let originals = moviesList.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 100) {
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])



  return (
    <div className="Home-page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className='movies'>
        {movieList.map((item, key) => (
          <MoviesArea key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com <BsFillSuitHeartFill /> por <a href='https://github.com/LucasA0'>Lucas Araujo</a> <br />
        Direitos de Imagem para a Netflix <br />
        Dados pegos pelo site Themoviedb.org
      </footer>

      {
        movieList <= 0 &&
        <div className="loading">
          <img src="https://c.tenor.com/Rfyx9OkRI38AAAAM/netflix-netflix-startup.gif" alt="loading escrito netflix" />
        </div>
      }

    </div>
  )
}

export default Index
