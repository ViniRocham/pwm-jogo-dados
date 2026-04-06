"use client";

type Props = {
  valor: number;
  rolling?: boolean;
};

export default function Dado({ valor, rolling }: Props) {
  const map: Record<number, number[][]> = {
    1: [[0,0,0],[0,1,0],[0,0,0]],
    2: [[1,0,0],[0,0,0],[0,0,1]],
    3: [[1,0,0],[0,1,0],[0,0,1]],
    4: [[1,0,1],[0,0,0],[1,0,1]],
    5: [[1,0,1],[0,1,0],[1,0,1]],
    6: [[1,0,1],[1,0,1],[1,0,1]],
  };

  return (
    <div className={`w-20 h-20 bg-white rounded-2xl grid grid-cols-3 grid-rows-3 p-2 shadow-lg border ${rolling ? "animate-spin-slow" : ""}`}>
      {map[valor].map((row, i) =>
        row.map((col, j) => (
          <div key={`${i}-${j}`} className="flex items-center justify-center">
            {col === 1 && <div className="w-3 h-3 bg-black rounded-full"></div>}
          </div>
        ))
      )}
    </div>
  );
}