import { h } from "preact";

// By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL

export function Spinner({ color = "#FFF", width = 32, height, time = 0.8 }) {
    if (height) {
        width = 4 * height;
    }
    else {
        height = width / 4;
    }
    const circles = [{
        x: width / 8,
        y: width / 8,
        r: [width / 8, width * 3 / 40],
        opacity: [1, 0.5]
    }, {
        x: width / 2,
        y: width / 8,
        r: [width * 3 / 40, width / 8],
        opacity: [0.5, 1]
    }, {
        x: width * 7 / 8,
        y: width / 8,
        r: [width / 8, width * 3 / 40],
        opacity: [1, 0.5]
    }];
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" fill={color}>
            {circles.map(circle =>
                <circle cx={circle.x} cy={circle.y} r={circle.r[0]}>
                    <animate attributeName="r" from={circle.r[0]} to={circle.r[0]}
                            begin="0s" dur={`${time}s`}
                            values={`${circle.r[0]};${circle.r[1]};${circle.r[0]}`} calcMode="linear"
                            repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" from={circle.opacity[0]} to={circle.opacity[0]}
                            begin="0s" dur={`${time}s`}
                            values={`${circle.opacity[0]};${circle.opacity[1]};${circle.opacity[0]}`} calcMode="linear"
                            repeatCount="indefinite" />
                </circle>
            )}
        </svg>
    );
}