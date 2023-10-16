import React,{ useState } from 'react';
import './App.css';
import Card from './components/Card';
import CardFrontend from './components/CardFrontend';
import CardBackend from './components/CardBackend';

function App() {

  const [cardInfo, setCardInfo] = useState({
    name:"JANE APPLESEED",
    CardNumber:"0000 0000 0000 0000",
    month:'00',
    year:'00',
    cvc:'123'
  });

  return (
        <>
          <div className='container'>
            <div className='leftside'></div> 
            <div className='rightside'>
              <Card onUpdateCardInfo={(newcardinfo)=>
              setCardInfo(newcardinfo)
              }/>
            </div>
            <CardFrontend {...cardInfo}/>
            <CardBackend {...cardInfo}/>
          </div>
        </>
  )
}

export default App;