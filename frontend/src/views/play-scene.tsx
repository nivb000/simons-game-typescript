import { useEffect, useState } from "react"
import { HandleSceneProps } from '../interfaces/handleSceneProps'
import { Rounds } from "../interfaces/round"
import gameOverSound from '../assets/sounds/game-over.mp3'
// @ts-ignore
import { GameBoard } from "../cmps/game-board"
// @ts-ignore
import { roundService } from '../services/round.service'
// @ts-ignore
import { statsService } from '../services/stats.service'

export const PlayScene: React.FC<HandleSceneProps> = ({ handleScene }) => {

  const [isQuery, setIsQuery] = useState<boolean>(true)
  const [rounds, setRounds] = useState<Rounds>([])
  const [currRound, setCurrRound] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [stats, setStats] = useState({ highScore: 0 })
  const [currScore, setCurrScore] = useState<number>(0)


  useEffect(() => {
    if (isQuery) {
      Promise.all([statsService.queryStats(), roundService.query()])
        .then(([stats, rounds]) => {
          setStats(stats);
          setRounds(rounds);
          setIsPlaying(true);
          setIsQuery(false);
        });
    }
  }, [])

  const handlePlayerMoves = (color: string) => {
    if (typeof rounds !== "undefined") {
      rounds[currRound].playerInput.push(color)
      const verified = verifyMove(rounds[currRound].playerInput, rounds[currRound].sequence)
      handleEndScenario(verified)
    }
  }

  const verifyMove = (arr1: string[], arr2: string[]) => {
    const minLength = Math.min(arr1.length, arr2.length)
    for (let i = 0; i < minLength; i++) {
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  }

  const handleEndScenario = (verifiedMove: boolean) => {
    const maxLength = (rounds[currRound].sequence.length)
    //WIN MATCH
    if (typeof rounds !== "undefined" && verifiedMove && rounds[currRound].playerInput.length === rounds[rounds.length - 1].sequence.length) {
      rounds[currRound].roundOver = true
      handleGameFinished()
      return
    }

    //WIN ROUND
    if (verifiedMove && rounds[currRound].playerInput.length === maxLength) {
      rounds[currRound].roundOver = true
      setCurrRound(prevRound => prevRound + 1)
      setCurrScore(prev => prev + 1)
      document.title = `Simon's Game score: ${currScore + 1}`
      if (currScore >= stats.highScore) setStats(prev => ({ ...prev, highScore: currScore + 1 }))
      return
    }
    //LOST
    if (!verifiedMove) {
      roundService.remove()
      rounds[currRound].roundOver = true
      new Audio(gameOverSound).play()
      document.title = `Simon's Game score: ${0}`
      handleGameFinished()
      return
    }
  }

  const handleGameFinished = () => {
    statsService.saveStats(stats)
      .then(setCurrScore(0))
    setCurrRound(0)
    setIsPlaying(false)
  }


  return <div className="flex col justify-center play-scene" >
    {rounds && <GameBoard round={rounds[currRound]} handlePlayerMoves={handlePlayerMoves} />}
    <div className="flex space-between play-options">
      <button className="btn-quit" onClick={() => handleScene(true)}>QUIT</button>
      {!isPlaying &&
        <button className="btn-playagain"
          onClick={() => handleScene(true)}>Play Again</button>}

      <div className="stats">
        <p className="flex space-between">score: <span>{currScore}</span></p>
        <p className="flex space-between">highest: <span>{stats.highScore}</span></p>
      </div>
    </div>
  </div>
}