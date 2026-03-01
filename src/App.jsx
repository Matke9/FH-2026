import {useState} from 'react';
import { stranice } from './features/pravilnik-data';
import svitak from './assets/svitak.svg';
import svitakPhone from './assets/svitakPhone.svg';
import './index.css';
import './styles/Pravilnik.css';

function App(){
  const [index, setIndex] = useState(0);

  const sledecaStrana = () =>{
    if(index < stranice.length - 1) setIndex(index+1);
  };

  const prethodnaStrana = () =>{
    if(index>0) setIndex(index-1);
  };

  return(
    <div className='pravilnik-page-wrapper'>
      <div className='bg-overlay'></div>
      <h1 className='naslov-pravilnik'>
        Pravilnik
      </h1>
      <div className='svitak-container'>
        <img src={svitak} className='svitak-bg desktop-only' alt="scroll" />
        <img src={svitakPhone} className='svitak-bg mobile-only' alt="scroll-mobile" />
        <div className='svitak-boja'></div>
        <div className='svitak-content'>
          <h2 className='podnaslov-pravilnik'>{stranice[index].naslov}</h2>
          <p className='tekst-pravilnik'>{stranice[index].tekst}</p>
        </div>
      </div>
      <div className='navigacija-pravilnik'>
        <button onClick={prethodnaStrana} className='strelica'>
          {"<<"}
        </button>
        <span className='broj-strane'>
          {index+1}
        </span>
        <button onClick={sledecaStrana} className='strelica'>
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default App