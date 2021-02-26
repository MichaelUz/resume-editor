import './App.css';
import HomePage from './containers/HomePage/HomePage';
import Editor from './containers/Editor/Editor';
import firebase from './firebase/firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {

  let style = {
    backgroundColor: 'rgb(246, 246, 246)',
    minHeight: '100vh',
    minWidth: '100vw'
}


  return (
    <Router>
      <div style={style}>
        <header className="App-header">
        </header>
        <Switch>
          <Route exact path="/">
            <HomePage db={firebase.database()} auth={firebase.auth()}/>
          </Route>
          <Route exact path="/editor">
            <Editor auth={firebase.auth()} db={firebase.database()}/>
          </Route>
        </Switch>
      </div>
    </Router> 
  );
}

export default App;
