import { useState } from "react";

const fibonacciSequence = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
export const dogsss = [
  { dogId: 1, name: "Golden Retriever", imgUrl: "/dogs/golden.jpg" },
  { dogId: 2, name: "Cavoodle", imgUrl: "/dogs/cavoodle.png" },
  { dogId: 3, name: "Labrador", imgUrl: "/dogs/lab.jpg" },
  { dogId: 4, name: "German Shepherd", imgUrl: "/dogs/german.jpg" },
  { dogId: 5, name: "Bulldog", imgUrl: "/dogs/bull.jpg" },
  { dogId: 6, name: "Chihuahua", imgUrl: "/dogs/chi.jpg" },
];

export default function KatelynsComponentDONTDELETE({
  onValueSelect,
}: {
  onValueSelect: (value: number) => void;
}) {
  const [isDogs, setIsDogs] = useState(false);

  return (
    <>
      <button onClick={() => setIsDogs(!isDogs)}>
        Change to {!isDogs ? "dogs" : "fibonacci"}
      </button>
      {isDogs ? (
        <DogPad setSelectedValue={onValueSelect} />
      ) : (
        <FibNumberPad setSelectedValue={onValueSelect} />
      )}
    </>
  );
}

const FibNumberPad = ({
  setSelectedValue,
}: {
  setSelectedValue: (value: number) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "10px",
      }}
    >
      {fibonacciSequence.map((number) => (
        <div key={number}>
          <button
            onClick={() => setSelectedValue(number)}
            style={{
              width: "auto",
              fontSize: "18px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {number}
          </button>
        </div>
      ))}
    </div>
  );
};

const DogPad = ({
  setSelectedValue,
}: {
  setSelectedValue: (value: number) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "10px",
      }}
    >
      {dogsss.map((dog) => (
        <div key={dog.dogId}>
          <button
            onClick={() => setSelectedValue(dog.dogId)}
            style={{
              width: "150px",
              fontSize: "18px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100px",
                backgroundImage: `url(${dog.imgUrl})`,
                backgroundSize: "cover",
                borderRadius: "5px",
              }}
            ></div>
            {dog.name}
          </button>
        </div>
      ))}
    </div>
  );
};
