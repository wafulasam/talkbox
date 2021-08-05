import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// screens
import ChatHome from './screens/ChatHome/ChatHome';
import ChatRoom from './screens/ChatRoom/ChatRoom';

// components
import Preloader from './components/preloader/preloader';
import MainLayout from './components/layout/layout';

function App() {

  // spinner
  const [ spinner, setSpinner ] = useState(true); // preloading

  useEffect(()=> {

    // preloading
    setTimeout(()=> setSpinner(false), 1000); 

  },[]);

  if(spinner) {
    return <Preloader/>
  } 
  else {
    return (
        <MainLayout>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={ChatHome}/>
              <Route path='/chat-room' exact component={ChatRoom}/>
            </Switch>
          </BrowserRouter>
        </MainLayout>
    );
  }
}

export default App;