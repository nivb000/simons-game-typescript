import { useState, useEffect } from 'react'
import { colors } from '../services/colors'
import { GameBoardProps } from '../interfaces/gameBoardProps'
import { ColorButton } from './color-button'

export const GameBoard: React.FC<GameBoardProps> = ({ roundSequence, handlePlayerMoves, isPlaying }) => {

    const [isPlayerMove, setIsPlayerMove] = useState(false)
    const [computerMovesCount, setComputerMovesCount] = useState(0)
    const [playerMovesCount, setPlayerMovesCount] = useState(0)


    useEffect(() => {
        if (isPlaying) {
            let intervalId = setInterval(() => {
                if (computerMovesCount === roundSequence.length) {
                    setIsPlayerMove(true)
                    setComputerMovesCount(0)
                }
                if (isPlayerMove || computerMovesCount === roundSequence.length) {
                    return clearInterval(intervalId)
                }
                handleComputerMoves()
            }, 1000)

            return () => clearInterval(intervalId)
        } else {
            setComputerMovesCount(0)
            setPlayerMovesCount(0)
            setIsPlayerMove(false)
        }

    }, [roundSequence, computerMovesCount, isPlaying])

    const handleComputerMoves = () => {
        setComputerMovesCount(prevCount => prevCount + 1)
        const btnToClick = document.querySelector(`button[data-color='${roundSequence[computerMovesCount]}']`)
        const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
        })
        btnToClick?.dispatchEvent(clickEvent)
    }


    const handlePlayer = (color: string) => {
        setPlayerMovesCount(prev => prev + 1)
        handlePlayerMoves(color)
        if (playerMovesCount === roundSequence.length - 1) {
            setIsPlayerMove(false)
            setPlayerMovesCount(0)
        }
    }

    return <>
        <div className="game-board">
            {colors.map(col => <ColorButton key={col.color}
                col={col}
                isPlayerMove={isPlayerMove}
                handlePlayer={handlePlayer} />)}
        </div>
        <span className='flag-turn'>
            {isPlayerMove ? 'player turn' : 'computer turn'}
        </span>
    </>
}
