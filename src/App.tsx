import React from "react"
import { Storyline } from "./StoryLine"
import styles from "./App.module.css"

function App() {
    return (
        <main className={styles.app}>
            <p className={styles.attribution}>
                Built by <a href="https://pyzhianov.github.io/">Alex</a> / Get
                the full{" "}
                <a
                    href="https://drive.google.com/open?id=1GHJROCkmbGTE6K9WfCQ8z636aGuTcqIB"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    dataset
                </a>{" "}
            </p>

            <Storyline />
        </main>
    )
}

export default App
