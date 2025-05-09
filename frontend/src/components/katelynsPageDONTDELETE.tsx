import { useState } from "react";

const fibonacciSequence = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const dogsss = [
  { dogId: 1, name: "Labrador" },
  { dogId: 2, name: "German Shepherd" },
  { dogId: 3, name: "Golden Retriever" },
  { dogId: 4, name: "Cavoodle" },
  { dogId: 5, name: "Bulldog" },
  { dogId: 6, name: "Poodle" },
  { dogId: 7, name: "Beagle" },
  { dogId: 8, name: "Shih Tzu" },
  { dogId: 9, name: "Dachshund" },
  { dogId: 10, name: "Boxer" },
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
        gap: "10px",
        padding: "10px",
      }}
    >
      {dogsss.map((dog) => (
        <div key={dog.dogId}>
          <button
            onClick={() => setSelectedValue(dog.dogId)}
            style={{
              width: "auto",
              fontSize: "18px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {dog.name}
          </button>
        </div>
      ))}
    </div>
  );
};
