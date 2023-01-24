import { useState, useEffect } from 'react'
import { colors } from '../services/colors'
import { GameBoardProps } from '../interfaces/gameBoardProps'
// @ts-ignore
import { ColorButton } from './color-button'

export const GameBoard: React.FC<GameBoardProps> = ({ round, handlePlayerMoves }) => {

    const [isPlayerMove, setIsPlayerMove] = useState(false)
    const [movesCount, setMovesCount] = useState(0)
    const [playerMoves, setPlayerMoves] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!round) return

        let intervalId = setInterval(() => {
            if (movesCount === round.sequence.length) {
                setMovesCount(0)
                setPlayerMoves(0)
                setIsPlayerMove(true)
            }
            if (isPlayerMove || movesCount === round.sequence.length) {
                clearInterval(intervalId)
                return
            }
            handleComputerMoves()
        }, 1000)

        return () => clearInterval(intervalId)

    }, [round, movesCount])




    const handlePlaySound = (sound: string) => {
        new Audio(sound).play()
    }

    const handleComputerMoves = () => {
        setMovesCount(prevCount => prevCount + 1)
        const btnToClick = document.querySelector(`button[data-color='${round?.sequence[movesCount]}']`)
        const event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
        })
        btnToClick?.dispatchEvent(event)
    }


    const handlePlayer = (color: string) => {
        setPlayerMoves(prev => prev + 1)
        handlePlayerMoves(color)
        if (playerMoves === round.sequence.length - 1) {
            setIsPlayerMove(false)
            setMovesCount(0)
        }
    }

    return <div className="game-board">
        {round && colors.map(col => <ColorButton key={col.color}
            col={col}
            handlePlaySound={handlePlaySound}
            isPlayerMove={isPlayerMove}
            handlePlayer={handlePlayer} />)}
    </div>
}
