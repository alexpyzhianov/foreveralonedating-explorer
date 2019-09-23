import React from "react"
import styles from "./Tooltip.module.css"

export interface TooltipProps {
    top: number
    title: string
    score: number
    comments: number
    url: string
}

export const Tooltip: React.FC<TooltipProps> = ({
    top,
    title,
    score,
    comments,
    url,
}) => {
    return (
        <div className={styles.tooltip} style={{ top }}>
            <h4>{title}</h4>
            <p>
                <span role="img" aria-label="post score">
                    ⬆️
                </span>{" "}
                {score}
            </p>
            <p>
                <span role="img" aria-label="comments">
                    💬️
                </span>{" "}
                {comments}
            </p>
            <a
                href={
                    "https://www.reddit.com/r/ForeverAloneDating/comments/" +
                    url
                }
                target="_blank"
                rel="noopener noreferrer"
            >
                Open the post
            </a>
        </div>
    )
}
