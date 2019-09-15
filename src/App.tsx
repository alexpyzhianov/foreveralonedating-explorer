import React from "react"
import axios from "axios"
import { Post, ServerPost, serverPostToClient, filterGood } from "./shape"
import { Storyline } from "./StoryLine"
import styles from "./App.module.css"

const updateMilestones = [1000, 5000, 10000, 25742]

const fileNames = Array(64)
    .fill(0)
    .map((_, i) => `./data/out${i}.json`)

function App() {
    const [buffer, setBuffer] = React.useState<Post[]>([])
    const [posts, setPosts] = React.useState<Post[]>([])

    React.useEffect(() => {
        if (!fileNames.length) return
        const fileName = fileNames.pop() as string
        axios.get<any, { data: ServerPost[] }>(fileName).then(result => {
            const newPosts = result.data
                .map(serverPostToClient)
                .filter(filterGood)

            setBuffer([...buffer, ...newPosts])
        })
    }, [buffer])

    React.useEffect(() => {
        if (!updateMilestones.length || updateMilestones[0] <= buffer.length) {
            setPosts(buffer)
            updateMilestones.shift()
        }
    }, [buffer])

    return (
        <main className={styles.appContainer}>
            {posts.length > 0 && <Storyline posts={posts} />}

            {updateMilestones.length > 0 ? (
                <>
                    <div className={styles.loading}>
                        {" "}
                        Loading... ({updateMilestones.length} left){" "}
                    </div>
                    <div className={styles.heart}>
                        <div></div>
                    </div>
                </>
            ) : (
                <p className={styles.info}>
                    Get the full{" "}
                    <a
                        href="https://drive.google.com/open?id=1kLG9ls3zHLFy4HSKRlNdw23r-KJTiA-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        dataset
                    </a>
                </p>
            )}
        </main>
    )
}

export default App
