import logo from './logo.svg';
import './App.css';

    function App() {
      return (
        
          <Routes>
              <Route path="/" element={<VendegLayout />}>
                  <Route index element={<Kezdolap />} />
                  <Route path="bejelentkezes" element={<Bejelentkezes />} />
                  <Route path="regisztracio" element={<Regisztracio />} />
                
              </Route>
          </Routes>
        
      );
  }
  
  export default App;
