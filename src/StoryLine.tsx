import React from "react"
import axios from "axios"
import { FixedSizeList as List, areEqual } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import useComponentSize from "@rehooks/component-size"
import startOfDay from "date-fns/startOfDay"
import startOfMonth from "date-fns/startOfMonth"
import startOfYear from "date-fns/startOfYear"
import isSameDay from "date-fns/isSameDay"
import format from "date-fns/format"
import { scaleLinear, scalePow } from "d3-scale"
import { group } from "d3-array"
import { Tooltip } from "./Tooltip"
import { Face } from "./Face"
import { Post, ServerPost, serverPostToClient, filterGood } from "./shape"
import styles from "./StoryLine.module.css"

const commentsExtent = [0, 100]
const scoreExtent = [0, 500]

const sizeScale = scaleLinear()
    .domain(commentsExtent)
    .range([18, 60])

const fileList = Array(55)
    .fill(0)
    .map((_, i) => `./data/data${i}.json`)

type Day = [number, Post[]]

const postsCache: Post[] = []

interface RowProps {
    style: any
    date: number
    posts: Post[]
    selectedUrl: string
    setSelectedUrl(url: string): void
    verticalScale(v: number): number
}

const Row: React.FC<RowProps> = React.memo(
    ({ style, date, posts, selectedUrl, setSelectedUrl, verticalScale }) => {
        const year = isSameDay(date, startOfYear(date))
            ? format(date, "y")
            : null

        const month = isSameDay(date, startOfMonth(date))
            ? format(date, "MMMM")
            : null

        return (
            <>
                <div className={styles.column} style={style}>
                    <div className={styles.tick}>
                        {year && <div className={styles.year}>{year}</div>}
                        {month && <div className={styles.month}>{month}</div>}
                        <div>{format(date, "dd")}</div>
                    </div>
                    {posts.map(p => {
                        const top = verticalScale(p.score)
                        const isSelected = p.url === selectedUrl
                        return (
                            <>
                                <Face
                                    key={p.url}
                                    isSelected={isSelected}
                                    top={top}
                                    fontSize={sizeScale(p.comments)}
                                    post={p}
                                    onSelect={e => setSelectedUrl(p.url)}
                                />
                                {isSelected && <Tooltip top={top} {...p} />}
                            </>
                        )
                    })}
                </div>
            </>
        )
    },
    areEqual,
)

export const Storyline: React.FC = () => {
    const [leftBound, setLeftBound] = React.useState({
        year: "2019",
        month: "September",
    })
    const containerRef = React.useRef<HTMLDivElement>(null)
    const containerSize = useComponentSize(containerRef)

    const [selectedUrl, setSelectedUrl] = React.useState<string>("")
    const [days, setDays] = React.useState<Day[]>([])

    const loadMoreItems = React.useCallback(() => {
        const nextFile = fileList.shift()
        if (!nextFile) {
            return Promise.resolve()
        }

        return axios.get<any, { data: ServerPost[] }>(nextFile).then(result => {
            Array.prototype.push.apply(
                postsCache,
                result.data.map(serverPostToClient).filter(filterGood),
            )
            const days = Array.from(
                group(postsCache, p => startOfDay(p.createdUtc).valueOf()),
            )
            setDays(days)
        })
    }, [])

    const verticalScale = scalePow()
        .exponent(0.7)
        .domain(scoreExtent)
        .range([64, containerSize ? containerSize.height : 600])

    const isItemLoaded = (index: number) =>
        fileList.length === 0 || index < days.length

    const itemCount = fileList.length > 0 ? days.length + 1 : days.length

    const maybeUpdateLeftBound = React.useCallback(
        (timestamp: number) => {
            const year = format(timestamp, "y")
            const month = format(timestamp, "MMMM")

            const isChange =
                year !== leftBound.year || month !== leftBound.month

            if (isChange) {
                setLeftBound({ year, month })
            }
        },
        [leftBound],
    )

    return (
        <div className={styles.storyline} ref={containerRef}>
            {containerSize.height && (
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                >
                    {({ onItemsRendered, ref }) => (
                        <List
                            height={containerSize.height}
                            width={containerSize.width}
                            itemCount={itemCount}
                            itemData={days}
                            itemSize={40}
                            layout="horizontal"
                            overscanCount={2}
                            onItemsRendered={props => {
                                const center = Math.round(
                                    (props.visibleStopIndex +
                                        props.visibleStartIndex) /
                                        2,
                                )
                                const [date] = days[center]
                                    ? days[center]
                                    : [null]

                                onItemsRendered(props)

                                if (date) {
                                    maybeUpdateLeftBound(date)
                                }
                            }}
                            ref={ref}
                        >
                            {({ index, style, data }) => {
                                const [date, posts] = (data[index] || []) as Day
                                const updatedStyle = {
                                    ...style,
                                    left: (style.left as any) + 20,
                                }
                                return isItemLoaded(index) ? (
                                    <Row
                                        style={updatedStyle}
                                        date={date}
                                        posts={posts}
                                        selectedUrl={selectedUrl}
                                        setSelectedUrl={setSelectedUrl}
                                        verticalScale={verticalScale}
                                    />
                                ) : (
                                    <div
                                        className={styles.column}
                                        style={updatedStyle}
                                    >
                                        "..."
                                    </div>
                                )
                            }}
                        </List>
                    )}
                </InfiniteLoader>
            )}

            <div className={styles.fixedYear}>{leftBound.year}</div>

            <div className={styles.fixedMonth}>{leftBound.month}</div>
        </div>
    )
}
