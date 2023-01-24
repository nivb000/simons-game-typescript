import sound from '../assets/sounds/game-start.mp3'
import { HandleSceneProps } from '../interfaces/handleSceneProps'
export const StartScene: React.FC<HandleSceneProps> = ({ handleScene }) => {


  const handleClick = () => {
    new Audio(sound).play()
    handleScene(false)
  }

  return <div className='flex col space-around align-center start-scene'>
    <h1>Simon's</h1>
    <h3>Do what Simon Says...</h3>
    <p>Follow the pattern of lights and sounds
      for as long as you can... if you can!</p>
    <button onClick={handleClick}>:: PLAY ::</button>
  </div>
}
