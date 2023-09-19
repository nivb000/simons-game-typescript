import { useEffect, useState } from "react"
import { GameBoard } from "../cmps/game-board"
import { statsService } from '../services/stats.service'
import { utilService } from "../services/util.service"
import gameOverSound from '../assets/sounds/game-over.mp3'
import { HandleSceneProps } from "../interfaces/handleSceneProps"

export const PlayScene: React.FC<HandleSceneProps> = ({ handleScene }) => {

  const [roundSequence, setRoundSequence] = useState<string[]>([])
  const [playerSequence, setPlayerSequence] = useState<string[]>([])
  const [currRound, setCurrRound] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [stats, setStats] = useState({ highScore: 0, currScore: 0 })


  useEffect(() => {
    async function fetchStats() {
      const statsFromServer = await statsService.queryStats()
      setStats(prevStats => ({ ...prevStats, highScore: statsFromServer.highScore }))
    }
    fetchStats()
    initGame()
  }, [])


  const initGame = () => {
    setIsPlaying(true)
    setCurrRound(1)
    setPlayerSequence([])
    setRoundSequence([])
    setStats(prevStats => ({ ...prevStats, currScore: 0 }))
    document.title = `Simon's Game score: ${0}`
  }

  useEffect(() => addColor(), [currRound])


  const addColor = () => {
    const color = utilService.getRandomColor()
    setRoundSequence(prevSequence => [...prevSequence, color])
  }

  const handlePlayerMoves = (color:string) => {
    playerSequence.push(color)
    const verified = verifyMove(playerSequence, roundSequence)
    handleEndScenario(verified)
  }

  const verifyMove = (arr1: string[], arr2: string[]) => {
    const minLength = Math.min(arr1.length, arr2.length)
    for (let i = 0; i < minLength; i++) {
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  }

  const handleEndScenario = (verifiedMove: boolean) => {
    //WIN
    if (verifiedMove && playerSequence.length === roundSequence.length) {
      setPlayerSequence([])
      setCurrRound(prevRound => prevRound + 1)
      if (stats.currScore >= stats.highScore) {
        setStats(prev => ({ currScore: prev.currScore + 1, highScore: prev.currScore + 1 }))
        statsService.saveStats({ highScore: stats.highScore + 1 })
      } else {
        setStats(prev => ({ ...prev, currScore: prev.currScore + 1 }))
      }
      document.title = `Simon's Game score: ${stats.currScore + 1}`
    }
    //LOST
    if (!verifiedMove) {
      new Audio(gameOverSound).play()
      setIsPlaying(false)
    }
  }


  return <div className="flex col justify-center play-scene" >
    <GameBoard
      roundSequence={roundSequence}
      handlePlayerMoves={handlePlayerMoves}
      isPlaying={isPlaying} />
    <div className="flex space-between play-options">
      <button className="btn-quit" onClick={() => handleScene(true)}>QUIT</button>
      {!isPlaying &&
        <button className="btn-playagain"
          onClick={initGame}>Play Again</button>}
      <div className="stats">
        <p className="flex space-between">score: <span>{stats.currScore}</span></p>
        <p className="flex space-between">highest: <span>{stats.highScore}</span></p>
      </div>
    </div>
  </div>
}