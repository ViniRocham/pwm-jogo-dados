"use client";

import { useState } from "react";
import Dado from "./dado";

function random() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [j1, setJ1] = useState([1, 1]);
  const [j2, setJ2] = useState([1, 1]);
  const [vez, setVez] = useState<"A" | "B">("A");
  const [resultado, setResultado] = useState("");
  const [placar, setPlacar] = useState({ A: 0, B: 0 });
  const [rolling, setRolling] = useState(false);

  const maxRodadas = 5;

  const jogar = (jogador: "A" | "B") => {
    if (vez !== jogador) return;

    setRolling(true);

    setTimeout(() => {
      const dados = [random(), random()];

      if (jogador === "A") {
        setJ1(dados);
        setVez("B");
      } else {
        setJ2(dados);
        setVez("A");

        const somaA = j1[0] + j1[1];
        const somaB = dados[0] + dados[1];

        if (somaA > somaB) {
          setResultado("Jogador A venceu 🎉");
          setPlacar((p) => ({ ...p, A: p.A + 1 }));
        } else if (somaB > somaA) {
          setResultado("Jogador B venceu 🎉");
          setPlacar((p) => ({ ...p, B: p.B + 1 }));
        } else {
          setResultado("Empate 🤝");
        }

        if (rodada < maxRodadas) {
          setRodada((r) => r + 1);
        }
      }

      setRolling(false);
    }, 700);
  };

  const reiniciar = () => {
    setRodada(1);
    setPlacar({ A: 0, B: 0 });
    setResultado("");
    setJ1([1, 1]);
    setJ2([1, 1]);
    setVez("A");
  };

  const fim = rodada === maxRodadas && resultado !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white flex items-center justify-center p-6">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 w-full max-w-2xl">

        <h1 className="text-3xl font-bold">🎲 Jogo de Dados</h1>
        <p className="text-gray-400">Rodada {rodada}</p>

        <div className="flex gap-10">

          {/* Jogador A */}
          <div className="flex flex-col items-center gap-3 bg-slate-800/60 p-4 rounded-2xl shadow-lg">
            <div className="flex gap-2">
              <Dado valor={j1[0]} rolling={rolling} />
              <Dado valor={j1[1]} rolling={rolling} />
            </div>
            <p className="font-semibold">Jogador A</p>

            <button
              onClick={() => jogar("A")}
              disabled={vez !== "A" || fim}
              className={`px-5 py-2 rounded-xl font-bold transition ${
                vez === "A"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 opacity-50"
              }`}
            >
              Jogar
            </button>
          </div>

          {/* Jogador B */}
          <div className="flex flex-col items-center gap-3 bg-slate-800/60 p-4 rounded-2xl shadow-lg">
            <div className="flex gap-2">
              <Dado valor={j2[0]} rolling={rolling} />
              <Dado valor={j2[1]} rolling={rolling} />
            </div>
            <p className="font-semibold">Jogador B</p>

            <button
              onClick={() => jogar("B")}
              disabled={vez !== "B" || fim}
              className={`px-5 py-2 rounded-xl font-bold transition ${
                vez === "B"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "bg-gray-500 opacity-50"
              }`}
            >
              Jogar
            </button>
          </div>

        </div>

        <div className="text-xl font-semibold text-center">
          {resultado}
        </div>

        <div className="bg-slate-800/70 px-6 py-3 rounded-xl shadow text-lg">
          Placar: A {placar.A} x {placar.B} B
        </div>

        {fim && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-yellow-400">
              {placar.A > placar.B
                ? "🏆 Jogador A venceu o jogo!"
                : placar.B > placar.A
                ? "🏆 Jogador B venceu o jogo!"
                : "🤝 Empate geral!"}
            </h2>

            <button
              onClick={reiniciar}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
            >
              Jogar novamente
            </button>
          </div>
        )}

      </div>
    </div>
  );
}