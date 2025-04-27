import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.BACKEND_URL || 'http://localhost:5000';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Ładowanie...'}
    </div>
  );
}

export default App;
