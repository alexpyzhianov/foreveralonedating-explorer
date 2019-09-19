import React from "react"
import { Post, Gender, TooltipState } from "./shape"
import styles from "./Face.module.css"

function getEmoji(age: number, gender: Gender) {
    if (age < 20 && gender === "m") {
        return "👦"
    } else if (age < 20 && gender === "f") {
        return "👧"
    } else if (age < 40 && gender === "m") {
        return "👨"
    } else if (age < 40 && gender === "f") {
        return "👩"
    } else if (age < 60 && gender === "m") {
        return "👨‍🦳"
    } else if (age < 60 && gender === "f") {
        return "👩‍🦳"
    } else if (gender === "f") {
        return "👵"
    } else if (gender === "m") {
        return "👴"
    } else {
        return "👽"
    }
}

export interface FaceProps {
    isSelected: boolean
    top: number
    fontSize: number
    post: Post
    setTooltip(tooltip: TooltipState): void
}

export const Face: React.FC<FaceProps> = ({
    isSelected,
    top,
    fontSize,
    post,
    setTooltip,
}) => (
    <div
        tabIndex={0}
        className={styles.post + (isSelected ? styles.selected : "")}
        style={{ top, fontSize }}
        onFocus={e => {
            const r = e.target.getBoundingClientRect()
            setTooltip({
                top: r.top,
                left:
                    document.documentElement.scrollLeft +
                    r.left +
                    r.width / 2 +
                    40,
                ...post,
            })
        }}
    >
        {getEmoji(
            post.age as number, // handled by filter
            post.fromGender as Gender,
        )}
    </div>
)
