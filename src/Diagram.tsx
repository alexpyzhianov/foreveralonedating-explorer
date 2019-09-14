import React from "react"
import axios from "axios"
import format from "date-fns/format"
import { group, extent } from "d3-array"
import { Post, ServerPost, serverPostToClient } from "./shape"
import "./App.css"
import { scaleLinear } from "d3-scale"

function App() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [posts, setPosts] = React.useState<Post[]>([])

    const container = containerRef.current
        ? containerRef.current.getBoundingClientRect()
        : null

    const [minAge, maxAge] = extent(posts, p => p.age)
    const [minScore, maxScore] = extent(posts, p => p.score)

    const xScale = scaleLinear()
        .domain([0, maxAge as number])
        .range([0, container ? container.right : 0])

    const yScale = scaleLinear()
        .domain([0, maxScore as number])
        .range([container ? container.bottom : 0, 0])

    React.useEffect(() => {
        axios
            .get<any, { data: ServerPost[] }>("./data.json")
            .then(result => setPosts(result.data.map(serverPostToClient)))
    }, [])

    // const frequencyData = group(posts, p => format(p.createdUtc, "dd-MM-yyyy"))
    // console.log(frequencyData)

    return (
        <div className="container">
            <div className="diagram" ref={containerRef}>
                {posts.slice(0, 10000).map(p => {
                    if (!p.score || !p.age) return null

                    const transform = `translate(${xScale(p.age)}px, ${yScale(
                        p.score,
                    )}px)`

                    return <div className="dot" style={{ transform }} />
                })}
            </div>
        </div>
    )
}

export default App
