import { Round } from "./round";

export interface GameBoardProps {
    round: Round,
    handlePlayerMoves: (color: string) => void;
  }