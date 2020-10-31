import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import  MovieList from "./Component/Movies/MovieList";

function App() {
  return (
    <main role="main" className="container">
        <div className="starter-template">
          <MovieList/>
        </div>
    </main>
  );
}

export default App;
