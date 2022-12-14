import './index.css'
import {BsFillPlayFill} from 'react-icons/bs'

export default ({ item }) => {

  const firstDate = new Date(item.first_air_date);
  const genres = [];

  for(let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  let description = item.overview;
  if(description.length > 200) {
    description = description.substring(0, 200) + '...';
  }

  return (
    <section className='featured' style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className='featured-vertical'>
        <div className='featured-horizontal'>
          <div className="featured-name">{item.name}</div>
          <div className="featured-info">
            <div className="featured-description">{description}</div>
            <div className="featured-points">{item.vote_average.toFixed(1)} pontos</div>
            <div className="featured-year">{firstDate.getFullYear()}</div>
            <div className="featured-seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>

            <div className="featured-buttons">
              <button className='featured-watchButton'>Assistir</button>
              <button className="featured-myListButton">+ Minha Lista</button>
            </div>
            <div className="featured-genres"><strong>Gêneros:</strong> {genres.join(', ')} </div>
          </div>
        </div>
      </div>
    </section>
  )
}
