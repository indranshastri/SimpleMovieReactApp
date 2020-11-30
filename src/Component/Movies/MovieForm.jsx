import Form from "../Common/Form/Form";  


class MovieForm extends Form {
    state = { 
        data:{
            title:"",
            genre:"",
            numberInStock:"",
            Rate:"",
        }
     }

  


    render() { 
        return (  
            <div>
                <h1>Movie From</h1>
            </div>
        );
    }
}
 
export default MovieForm;