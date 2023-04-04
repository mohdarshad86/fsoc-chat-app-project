import { Route } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';

//Containers are used to constrain a content's width to the current breakpoint, while keeping it fluid.

function App() {
  return (
    <div className="App">
      <Route path='/' component={Homepage} exact/>
      <Route path='/chats' component={Chatpage} />
    </div>
  );
}

export default App;
