import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Homepage} exact />
        <Route path='/chats' component={Chatpage} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;