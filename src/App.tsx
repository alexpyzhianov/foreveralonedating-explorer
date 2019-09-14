import React from "react"
import axios from "axios"
import { Post, ServerPost, serverPostToClient, filterGood } from "./shape"
import { ReactVis } from "./ReactViz"

function App() {
    const [posts, setPosts] = React.useState<Post[]>([])

    React.useEffect(() => {
        axios
            .get<any, { data: ServerPost[] }>("./data.json")
            .then(result =>
                setPosts(
                    result.data.map(serverPostToClient).filter(filterGood),
                ),
            )
    }, [])

    console.log(posts.length)

    return <ReactVis posts={posts} />
}

export default App
