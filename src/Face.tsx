import React from "react"
import { Post, Gender } from "./shape"
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
    onFocus(e: React.FocusEvent<HTMLDivElement>): void
}

export const Face: React.FC<FaceProps> = ({
    isSelected,
    top,
    fontSize,
    post,
    onFocus,
}) => (
    <div
        tabIndex={0}
        className={`${styles.post} ${isSelected ? styles.selected : ""}`}
        style={{ top, fontSize }}
        onFocus={onFocus}
    >
        {getEmoji(
            post.age as number, // handled by filter
            post.fromGender as Gender,
        )}
    </div>
)
