import { Round } from "./round";

export interface GameBoardProps {
    roundSequence: string[],
    handlePlayerMoves: (color: string) => void;
    isPlaying: boolean
  }