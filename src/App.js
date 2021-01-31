import { useState, useEffect } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete'
import Overlay from './components/Overlay';
import ToastError from './components/ToastError';

const URL = "https://api.github.com/repos/facebook/react/issues";

function App() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState({ message: "", status: false });
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    getIssuesFromGithub();
    return () => {
      getIssuesFromGithub();
    }
  }, [])

  const getIssuesFromGithub = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const responseJSON = await response.json();
      if(response.status === 200){
        setIssues(responseJSON)
      } else {
        setError({
          message: responseJSON.message,
          status: true
        })
      }
    } catch (e) {
      setError({
        message: e,
        status: true
      })
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="App">
      {error.status && <ToastError message={error.message} /> }
      {loading && <Overlay />}
      <header className="App-header">
        <Autocomplete options={issues} />
      </header>
    
    </div>
  );
}

export default App;
