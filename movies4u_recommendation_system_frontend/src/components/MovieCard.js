import "../styles/Card.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const currentMovie = movie.title;

    const goToMovie = () => {
        navigate(`/movieinfo/${currentMovie}`);
        window.location.reload();
    };

    const img_path = "https://image.tmdb.org/t/p/w342";

    return (
        <div onClick={goToMovie} className="Main-Card">
            {movie.poster_path && (
                <img
                    src={img_path + movie.poster_path}
                    alt={movie.title}
                    title={movie.title}
                    className="Poster"
                />
            )}
            <div className="Movie-Title">
                {movie.title}
            </div>
        </div>
    );
};

export default MovieCard;
