import { Router, Redirect } from "@reach/router";

import Posts from './components/posts'

function App() {
  return (
    <Router>
      <Redirect from="/" to="/posts" />
      <Posts path="/posts" />
    </Router>
  );
}

export default App;
