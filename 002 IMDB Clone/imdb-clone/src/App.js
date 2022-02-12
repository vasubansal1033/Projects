import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.js'
import Banner from './components/Banner.js'
import Movies from './components/Movies.js'
import Pagination from './components/Pagination.js'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Favorites from './components/Favorites.js'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>   
      <Routes>
        <Route path="/" element={
          <>
            <Banner/>
            <Movies/>
            {/* <Pagination/> */}
          </>
        }/>
        <Route path="favorites" element={<Favorites/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
