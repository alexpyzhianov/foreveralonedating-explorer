import React from "react"
import axios from "axios"
import { FixedSizeList as List, areEqual } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import useComponentSize from "@rehooks/component-size"
import startOfDay from "date-fns/startOfDay"
import format from "date-fns/format"
import { scaleLinear, scalePow } from "d3-scale"
import { group } from "d3-array"
import { Tooltip } from "./Tooltip"
import { Face } from "./Face"
import {
    Post,
    ServerPost,
    serverPostToClient,
    filterGood,
    TooltipState,
} from "./shape"
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
    tooltip: TooltipState | null
    setTooltip(t: TooltipState): void
    verticalScale(v: number): number
}

const Row: React.FC<RowProps> = React.memo(
    ({ style, date, posts, setTooltip, verticalScale, tooltip }) => (
        <>
            {console.log(style)}
            <div className={styles.column} style={style}>
                <div className={styles.tick}>
                    <div className={styles.year}>{format(date, "y")}</div>
                    <div>{format(date, "MMM")}</div>
                    <div>{format(date, "dd")}</div>
                </div>
                {posts.map(p => (
                    <Face
                        key={p.url}
                        isSelected={Boolean(tooltip && p.url === tooltip.url)}
                        top={verticalScale(p.score)}
                        fontSize={sizeScale(p.comments)}
                        post={p}
                        onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
                            const r = e.target.getBoundingClientRect()
                            setTooltip({
                                top: r.top - 40,
                                left: r.left + r.width / 2,
                                ...p,
                            })
                        }}
                    />
                ))}
            </div>
        </>
    ),
    areEqual,
)

export const Storyline: React.FC = () => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const containerSize = useComponentSize(containerRef)

    const [tooltip, setTooltip] = React.useState<TooltipState | null>(null)
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
        .range([54, containerSize ? containerSize.height : 600])

    console.log(verticalScale(400))

    const isItemLoaded = (index: number) =>
        fileList.length === 0 || index < days.length
    const itemCount = fileList.length > 0 ? days.length + 1 : days.length

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
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                        >
                            {({ index, style, data }) => {
                                const [date, posts] = (data[index] || []) as Day
                                return isItemLoaded(index) ? (
                                    <Row
                                        style={style}
                                        date={date}
                                        posts={posts}
                                        tooltip={tooltip}
                                        setTooltip={setTooltip}
                                        verticalScale={verticalScale}
                                    />
                                ) : (
                                    <div
                                        className={styles.column}
                                        style={style}
                                    >
                                        "Loading..."
                                    </div>
                                )
                            }}
                        </List>
                    )}
                </InfiniteLoader>
            )}

            {tooltip && <Tooltip {...tooltip} />}
        </div>
    )
}
