import './App.css';
import { birds } from './data';
import React, { useState, useEffect} from 'react';
import ls from 'local-storage';

function App() {
  
  const [Lapbirds, setBirds] = useState(birds);
  const [sortSentence, setSort] = useState([]);

  useEffect(() => {
    if(ls.get('birds') != null && ls.get('birds').length == birds.length){
        setBirds(ls.get('birds'));
    }
  },[]);
  const handleAddCount = (id) =>{
    let TempBirds =  [...Lapbirds];
    TempBirds[id].count += 1;
    setBirds(TempBirds);
    ls.set('birds',TempBirds);
  }

  const handleSubstractCount = (id) =>{
    let TempBirds =  [...Lapbirds];
    TempBirds[id].count = TempBirds[id].count > 0 ? TempBirds[id].count -= 1 : 0;
    setBirds(TempBirds);
    ls.set('birds',TempBirds);
  }

  const handleClearCount = () => {
    let TempBirds =  [...Lapbirds];
    TempBirds.map(bird => bird.count = 0);
    setBirds(TempBirds);
    ls.set('birds',TempBirds);
  }

  const sort = () => {
    let TempBirds =  [...Lapbirds];
    TempBirds.sort( (a, b) => b.count - a.count );
   
    setSort(TempBirds);
  }

  return (

    <div className="App">
      <div className="parent">
      {Lapbirds.map(bird => (
        <div className="item">
          <div>
            {bird.name}
          </div>
          <p>count : {bird.count}</p>
          <button onClick={() => handleAddCount(bird.id)}>Add</button>
          <button onClick={() => handleSubstractCount(bird.id)}>Subtract</button>
        </div>
      ))}
      </div>
    <button onClick={() => handleClearCount()}>Clear</button>
    <br/>
    <button onClick={() => sort()}>Sort</button>

    <div>
        
    </div>
    
    {sortSentence.length > 0? sortSentence.map(bird => (
        <div >
          <p>{bird.name}, count : {bird.count}</p>
        </div>
      )) : null}
    </div>
  );
}

export default App;
