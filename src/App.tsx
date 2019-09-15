import React from "react"
import axios from "axios"
import { Post, ServerPost, serverPostToClient, filterGood } from "./shape"
import { Storyline } from "./StoryLine"

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

    return posts.length > 0 ? <Storyline posts={posts} /> : null
}

export default App
