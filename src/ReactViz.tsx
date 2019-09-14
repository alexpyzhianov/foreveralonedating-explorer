import React from "react"
import {
    XYPlot,
    Highlight,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    MarkSeries,
} from "react-vis"
import { Post } from "./shape"

export interface ReactVisProps {
    posts: Post[]
}

export interface VizData {
    x: number
    y: number
    url: string
}

const genderToColor = {
    m: "#00f",
    f: "#f00",
    r: "#0f0",
}

interface Brush {
    top: number
    left: number
    bottom: number
    right: number
}

export const ReactVis: React.FC<ReactVisProps> = ({ posts }) => {
    const [brush, setBrush] = React.useState<Brush | null>(null)

    const data: VizData[] = posts
        .filter(p => p.age !== undefined && p.fromGender)
        .map(p => ({
            x: p.age as number,
            y: p.score,
            url: p.url,
            color: p.fromGender ? genderToColor[p.fromGender] : "gray",
            opacity: brush ? 0.05 : p.fromGender ? p.score / 300 : 0,
        }))

    return (
        <XYPlot
            height={800}
            width={800}
            xDomain={brush && [brush.left, brush.right]}
            yDomain={brush && [brush.bottom, brush.top]}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries
                colorType="literal"
                data={data}
                onValueClick={(d: VizData) => window.open(d.url, "_blank")}
            />

            {!brush && (
                <Highlight onBrushEnd={(brush: Brush) => setBrush(brush)} />
            )}
            <button onClick={() => setBrush(null)}>Reset</button>
        </XYPlot>
    )
}
