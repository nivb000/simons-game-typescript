import { useState } from "react"
import { ColorButtonProps } from "../interfaces/colorButtonProps"

export const ColorButton: React.FC<ColorButtonProps> = ({ col, isPlayerMove, handlePlayer }) => {

    const [active, setActive] = useState(false)
    const className = 'quarter-circle-' +col.pos

    const handleClick = () => {
        setActive(true)
        setTimeout(() => setActive(false), 300)
        if(isPlayerMove){
            handlePlayer(col.color)
        }
        new Audio(col.sound).play()
    }

    return <button
        className={'circle ' +className}
        data-color={col.color}
        style={{ opacity: active ? 0.5 : 1 }}
        onClick={handleClick}>
    </button>
}
