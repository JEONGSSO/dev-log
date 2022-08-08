import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [a, b] = useState([
    {
      id: 0,
      name: "kim",
    },
    {
      id: 1,
      name: "lee",
    },
  ]);

  console.log(a);

  return (
    <div className="App">
      <div
        onClick={() => {
          b((prev) => {
            const zzz = () => {
              prev[0].name = "park";
            };

            console.log(1, prev);
            // name에 park가 나옴

            // zzz();

            console.log(2, prev);
            // name에 park가 나옴

            return prev;
          });
        }}
      >
        sdads
      </div>
    </div>
  );
}
