import React from "react"
import axios from "axios"
import { Post, ServerPost, serverPostToClient, filterGood } from "./shape"
import { Storyline } from "./StoryLine"
import styles from "./App.module.css"

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

    return (
        <main className={styles.appContainer}>
            {posts.length > 0 ? (
                <Storyline posts={posts} />
            ) : (
                <div className={styles.heart}>
                    Loading...
                    <div></div>
                </div>
            )}

            <p>
                Get the full{" "}
                <a
                    href="https://drive.google.com/open?id=1kLG9ls3zHLFy4HSKRlNdw23r-KJTiA-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    dataset
                </a>
            </p>
        </main>
    )
}

export default App
