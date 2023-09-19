import { useState } from "react"
//@ts-ignore
import { StartScene } from './views/start-scene'
//@ts-ignore
import { PlayScene } from "./views/play-scene"

export const App = () => {

  const [renderedStartScene, setRenderedStartScene] = useState(true)

  const handleScene = (value: any) => {
    setRenderedStartScene(value)
  }

  return <section className="main-layout App">
    {renderedStartScene ? 
    <StartScene handleScene={handleScene} /> 
    :
    <PlayScene handleScene={handleScene} />}
  </section>
}