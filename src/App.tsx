import React from "react"
import { Storyline } from "./StoryLine"
import styles from "./App.module.css"

function App() {
    return (
        <main className={styles.app}>
            <Storyline />

            <p className={styles.info}>
                Get the full{" "}
                <a
                    href="https://drive.google.com/open?id=1GHJROCkmbGTE6K9WfCQ8z636aGuTcqIB"
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
