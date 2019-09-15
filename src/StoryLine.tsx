import React from "react"
import { group, extent } from "d3-array"
import startOfDay from "date-fns/startOfDay"
import format from "date-fns/format"
import { Post, Gender } from "./shape"
import { scaleLinear, scaleTime } from "d3-scale"
import styles from "./StoryLine.module.css"

export interface StorylineProps {
    posts: Post[]
}

function getEmoji(age: number, gender: Gender) {
    if (age < 20 && gender === "m") {
        return "👦"
    } else if (age < 20 && gender === "f") {
        return "👧"
    } else if (age < 40 && gender === "m") {
        return "👨‍🦰"
    } else if (age < 40 && gender === "f") {
        return "👩"
    } else if (age < 60 && gender === "m") {
        return "👴"
    } else if (age < 60 && gender === "f") {
        return "🧓"
    } else if (gender === "f") {
        return "👵"
    } else if (gender === "m") {
        return "👴"
    } else {
        return "👽"
    }
}

export const Storyline: React.FC<StorylineProps> = ({ posts }) => {
    const daysMap = group(posts, p => startOfDay(p.createdUtc).valueOf())
    const days = Array.from(daysMap).sort(([a], [b]) => b - a)

    const commentsExtent = extent(posts, p => p.comments) as [number, number]
    const scoreExtent = extent(posts, p => p.score) as [number, number]

    const dayScale = scaleTime()
        .domain([days[0][0], days[days.length - 1][0]])
        .range([0, days.length * 40])

    const verticalScale = scaleLinear()
        .domain(scoreExtent)
        .range([60, window.innerHeight - 60])

    const sizeScale = scaleLinear()
        .domain(commentsExtent)
        .range([18, 60])

    return (
        <div className={styles.storyline}>
            {days.map(([date]) => {
                return (
                    <div
                        className={styles.date}
                        style={{ left: dayScale(date) }}
                        key={date.toString()}
                    >
                        <div className={styles.year}>{format(date, "y")}</div>
                        <div>{format(date, "MMM")}</div>
                        <div>{format(date, "dd")}</div>
                    </div>
                )
            })}

            {days.map(([date, posts]) => (
                <div
                    key={date.toString()}
                    className={styles.day}
                    style={{ left: dayScale(date) }}
                >
                    {posts
                        .filter(p => p.age && p.fromGender)
                        .map(p => (
                            <div
                                key={p.url}
                                className={styles.post}
                                style={{
                                    top: verticalScale(p.score),
                                    fontSize: sizeScale(p.comments),
                                }}
                                title={`${p.title} - ⬆️(${p.score}) 💬(${p.comments})`}
                                onClick={() => window.open(p.url, "_blank")}
                            >
                                {getEmoji(
                                    p.age as number, // handled by filter
                                    p.fromGender as Gender,
                                )}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    )
}
