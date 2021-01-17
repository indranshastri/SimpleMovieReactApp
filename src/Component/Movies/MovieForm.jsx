import Form from "../Common/Form/Form";
import Joi from 'joi-browser';

import {getMovies,saveData,getMovie} from "../../services/movieService";
import {getGenres} from "../../services/genereService";
import { exist } from "joi";


class MovieForm extends Form {
    state = {
        data: {
            id:"",
            title: "",
            genre: "",
            numberInStock:"",
            dailyRentalRate:""
        },
        genre: [],
        errors: ''
    };

    schema = {
        id:Joi.string().allow(''),

        title: Joi.string()
            .min(3)
            .max(30)
            .required()
            .label("Title"),

        genre: Joi.string().required()
            .label("Genre"),

        numberInStock: Joi.number().required().min(0).max(100)
            .label("Number In stock"),

        dailyRentalRate: Joi.number().required().min(0).max(10)
            .label("Rating"),

        

    }

    async populateGenre(){
        const {data:genreData} = await getGenres();
        const genre = [{"id":"",name:"All Genre"}, ...genreData];
        this.setState({genre});
    }

    async populateMovie(){
        try {
            const movieId = this.props.match.params.id;
            if(movieId == "new") return;

            const {data:movie} = await getMovie(movieId);   
            this.setState({data:this.mapToViewModel(movie)})  
        } catch (error) {
            if(error.response && error.response.status==404)
                this.props.history.replace("/not-found");
        }
    }

   async componentDidMount() {
        await this.populateGenre();
        await this.populateMovie();
    }

    mapToViewModel(movie){
        
        return {
            id:this.checkValue(movie._id),
            title: this.checkValue(movie.title),
            genre: this.checkValue(movie.genre._id),
            numberInStock:this.checkValue(movie.numberInStock),
            dailyRentalRate:this.checkValue(movie.dailyRentalRate)
        }
    }

    doSubmit() {
        let { data,genre} = this.state
        
        data.genre = genre.filter(e=>e._id==data.genre)[0];

        saveData(this.ReverseMapData(data));

        this.props.history.push("/movies");
    }
    

    ReverseMapData(data) {
        return {
            "_id":data.id,
            "title": data.title,
            "genreId":data.genre._id,             
            'numberInStock': data.numberInStock,           
            'dailyRentalRate': data.dailyRentalRate,           
        }
    }

    render() {
        const { genre } = this.state;
        let genreOptions = genre.map(
            values => {
                return {optValue:values._id,optLabel:values.name}
            }
        )
        return (
            <div>
                <h1>Movie From</h1>
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput("text", "title", "Movie Title")}
                    {this.renderDropdown("genre", "Genre", genreOptions)}
                    {this.renderInput("number", "numberInStock", "Number In Stock")}
                    {this.renderInput("number", "dailyRentalRate", "Rating")}
                    {this.renderButton("Save", "submit")}
                </form>
            </div>
        );
    }
}

export default MovieForm;