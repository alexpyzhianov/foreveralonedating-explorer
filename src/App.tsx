import React from "react"
import { Storyline } from "./StoryLine"
import styles from "./App.module.css"

function App() {
    return (
        <main className={styles.app}>
            <Storyline />

            <div className={styles.attribution}>
                <p>
                    Get the full{" "}
                    <a
                        href="https://drive.google.com/open?id=1GHJROCkmbGTE6K9WfCQ8z636aGuTcqIB"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        dataset
                    </a>{" "}
                </p>
                <p>
                    <a href="https://pyzhianov.github.io/">Contact</a> the
                    developer
                </p>
            </div>
        </main>
    )
}

export default App
