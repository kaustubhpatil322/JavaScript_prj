import './Main.css';

function Main({data , movieName}){
    if(data === null){
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div class="scroll-card">
            <div class="card-header">
                <h3>{movieName}</h3>
            </div>
            <div class="card-content">
                <img src={data.Poster} alt="" className="movie-poster" />
                <ul>
                    <li>Title : {data.Title}</li>
                    <li>Year : {data.Year}</li>
                    <li>Rated : {data.Rated} </li>
                    <li>Released : {data.Released}</li>
                    <li>Runtime : {data.Runtime}</li>
                    <li>Genre : {data.Genre}</li>
                    <li>Director : {data.Director}</li>
                    <li>Writer : {data.Writer}</li>
                    <li>Actors : {data.Actors}</li>
                    <li>Plot : <p>{data.Plot}</p></li>
                    <li className="rating-item">Ratings : 
                        <ul className="rating-list">
                            {data.Ratings?.map((rating , index) =>(
                                <li key={index}> 
                                    <span className="rating-source">{rating.Source}</span>
                                    <span className="rating-value">{rating.Value}</span>
                                </li>
                            ))}
                        </ul>

                    </li>
                    <li>Metascore : {data.Metascore}</li>
                    <li>imdbRating : {data.imdbRating}</li>
                    <li>imdbVotes : {data.imdbVotes}</li>
                    <li>Box Office : {data.BoxOffice}</li>
                    <li></li>
                </ul>


            </div>
        </div>
        
    )
}

export default Main;

