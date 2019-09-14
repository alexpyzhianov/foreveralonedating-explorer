import React from "react"
import axios from "axios"
import { Post, ServerPost, serverPostToClient } from "./shape"
import { ReactVis } from "./ReactViz"

function App() {
    const [posts, setPosts] = React.useState<Post[]>([])

    React.useEffect(() => {
        axios
            .get<any, { data: ServerPost[] }>("./data.json")
            .then(result => setPosts(result.data.map(serverPostToClient)))
    }, [])

    return <ReactVis posts={posts.slice(0)} />
}

export default App
