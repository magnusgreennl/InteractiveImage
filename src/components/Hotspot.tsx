import { Component, ReactNode, createElement } from "react";

export interface HotspotProps {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string | undefined;    
    onClick(event: React.MouseEvent<HTMLElement>):void
}

export class Hotspot extends Component<HotspotProps> {
    render(): ReactNode {
        /*
        const {coordinateTopX, coordinateTopY, coordinateBottomX, coordinateBottomY, onClick} = this.props
        return <area
            shape="rect" 
            coords={ `${coordinateTopX},${coordinateTopY},${coordinateBottomX},${coordinateBottomY}` } 
            alt="Cup of coffee"
            onClick={onClick}
            />
        */
        const {x, y, width, height, text, onClick} = this.props

        // The font-size defined in the CSS will influence the actual rendering, below corrections are for 30px
        // If you change the size you must also update the y coordinate of the <text> element
        return (
            <a onClick={onClick}>
                <g>
                    <rect x={x} y={y} width={width} height={height} />
                    { text && <circle cx={x+(width/2)} cy={y+(height/2)} r="20" fill="white"/> }                    
                    { text && <text x={x+(width/2)} y={y+(height/2)+3} dominant-baseline="middle" text-anchor="middle">{text}</text> }
                </g>
            </a>
        )
    }
}
 