import { useEffect, useState } from 'react';

function App() {
  const [dataFromServer, setDataFromServer] = useState();
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setDataFromServer(data));
  }, []);
  return (
    <>
      <div>Hello 13L</div>
      <h1>Data: {dataFromServer}</h1>
    </>
  );
}

export default App;
