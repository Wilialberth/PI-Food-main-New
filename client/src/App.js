import './App.css';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import CreateRecipe from './components/CreateRecipe';
import DetailsRecipe from './components/DetailsRecipe'
import NavBar from './components/NavBar';



function App() {
  const location = useLocation();

  return (
    <BrowserRouter>
      <div className="App">
        {location.pathname ==="/" && <NavBar/> }
          <Route exact path='/' component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path='/recipes/:id' component={DetailsRecipe}/>
          <Route exact path='/recipes' component={CreateRecipe}/>
      </div>
    </BrowserRouter>);
}

export default App;
