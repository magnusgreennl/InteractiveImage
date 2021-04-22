import { Component, ReactNode, createElement } from "react";

export interface HotspotProps {
    x: number;
    y: number;
    width: number;
    height: number;    
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
        const {x, y, width, height, onClick} = this.props
        return (
            <a onClick={onClick}>
                <rect x={x} y={y} width={width} height={height} />
            </a>
        )
    }
}
 