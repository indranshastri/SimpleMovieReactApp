import Form from "../Common/Form/Form";
import Joi from 'joi-browser';

import { AllUniqueGenre, getMovies, saveData,getMovie } from "./Services";


class MovieForm extends Form {
    state = {
        data: {
            id:"",
            title: "",
            genre: "",
            productionBugget: "",
            releaseDate: "",
            ImdbRating: "",
            ImdbVotes: "",
        },
        genre: [],
        errors: ''
    };

    schema = {
        id:Joi.number(),

        title: Joi.string()
            .min(3)
            .max(30)
            .required()
            .label("Movie Title"),

        genre: Joi.string().required()
            .label("Move genre"),

        productionBugget: Joi.number().required().min(0)
            .label("Production Budget"),

        releaseDate: Joi.string()
            .required()
            .label("Release Date"),

        ImdbRating: Joi.number().required().min(0).max(10)
            .label("Imdb Rating"),

        ImdbVotes: Joi.number().required().min(0)
            .label("Imdb Votes"),

    }


    componentDidMount() {
        let genre = [...AllUniqueGenre()];
        genre = genre.map(
            (value) => {

                return { optValue: value, optLabel: value }
            })
        this.setState({ genre })

        const movieId = this.props.match.params.id;
        if(movieId == "new") return;

        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace("/not-found");

        this.setState({data:this.mapToViewModel(movie)})
    }

    mapToViewModel(movie){
        return {
            id:this.checkValue(movie.id),
            title: this.checkValue(movie.Title),
            genre: this.checkValue(movie["Major Genre"]),
            productionBugget: this.checkValue(movie["Production Budget"]),
            releaseDate: this.changeToDate(this.checkValue(movie["Release Date"])),
            ImdbRating: this.checkValue(movie["IMDB Rating"]),
            ImdbVotes: this.checkValue(movie["IMDB Votes"]),
        }
    }

    doSubmit() {
        const data = this.state.data
        let relesedate = new Date(data.releaseDate);
        relesedate = relesedate.toLocaleString('default', { month: 'short' }) + " " + relesedate.getDate() + " " + relesedate.getFullYear();
        data.releaseDate = relesedate;

        saveData(this.ReverseMapData(data));

        this.props.history.push("/movies");
    }
    

    ReverseMapData(data) {
        return {
            "id":data.id,
            "Title": data.title, 
            "US Gross": null, 
            "Worldwide Gross": null, 
            "US DVD Sales": null, 
            "Production Budget": data.productionBugget, 
            "Release Date": data.releaseDate, 
            "MPAA Rating": null, 
            "Running Time min": null, 
            "Distributor": null, 
            "Source": null,
             "Major Genre": data.genre, 
             "Creative Type": null, 
             "Director": null, 
             "Rotten Tomatoes Rating": null, 
             "IMDB Rating": data.ImdbRating, 
             "IMDB Votes": data.ImdbVotes
        }
    }

    render() {
        let { genre } = this.state
        return (
            <div>
                <h1>Movie From</h1>
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput("text", "title", "Movie Title")}
                    {this.renderDropdown("genre", "Move genre", genre)}
                    {this.renderInput("number", "productionBugget", "Production Bugget")}
                    {this.renderInput("date", "releaseDate", "Release Date")}
                    {this.renderInput("number", "ImdbRating", "Imdb Rating")}
                    {this.renderInput("number", "ImdbVotes", "Imdb Votes")}
                    {this.renderButton("Save", "submit")}
                </form>
            </div>
        );
    }
}

export default MovieForm;