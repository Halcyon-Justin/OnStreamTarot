import React, { useState, useEffect } from "react";
import { StreamerbotClient } from "@streamerbot/client";

function App() {
  const [jsonData, setJsonData] = useState("");

  useEffect(() => {
    const client = new StreamerbotClient({
      onConnect: onConnect,
      onData: onData,
    });

    async function onConnect() {
      const response = await client.subscribe({
        General: ["Custom"],
      });
      console.log(response);
    }

    function onData(data) {
      const jsonData = JSON.stringify(data.data, null, 2);
      setJsonData(jsonData);
    }

    // Connect to the StreamerbotClient when the component mounts
    client.connect();

    // Clean up the client when the component unmounts
    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>JSON Data Display</h1>
      <pre>{jsonData}</pre>
    </div>
  );
}

export default App;
