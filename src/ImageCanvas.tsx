import { Component, ReactNode, createElement, createRef } from "react"
import { ValueStatus, DynamicValue, WebImage } from "mendix"

import "./ui/InteractiveImage.css"

export interface ImageCanvasProps {
    bgImage?: DynamicValue<WebImage>;
    onSelection(topLeft:Point, bottomRight:Point): void;
}
export declare interface Point{
    x: number, 
    y: number,
}
export interface ImageCanvasState {
    width: number,
    height: number,
}
function createPoint (x:number, y:number):Point{
    return { x, y }
}

export default class ImageCanvas extends Component<ImageCanvasProps> {
    // Use a reference to determine the image height that will be used for the svg viewport
    private myImageRef = createRef<HTMLImageElement>()
    private mySvgRef = createRef<SVGSVGElement>()
    private myCanvasRef = createRef<HTMLCanvasElement>()
    private dragStart: Point|undefined = undefined

    readonly state: ImageCanvasState = {
        height: 0,
        width: 0,
    };

    constructor(props:ImageCanvasProps) {
        super(props);
        this.state = {height: 0, width: 0}
    }

    renderBackground() {
        const {bgImage} = this.props;
        // See if we have a background image available
        if (bgImage?.status == ValueStatus.Available){
            return (
                <img 
                    className="image" 
                    src={bgImage.value.uri} 
                    ref={this.myImageRef}
                    onLoad={() => {
                        const image = this.myImageRef.current
                        if (image) {
                            this.setState({height: image.naturalHeight, width: image.naturalWidth })
                        }
                    }}
                />
            )
        }
        return null;
    }
    onMouseMove =(evt: React.MouseEvent<SVGSVGElement>)=>{ 
        // if we're not dragging, just return
        if (!this.dragStart) return;
        this.drawSelectionRectangle(this.getMousePosition(evt)!)
    }
    onMouseLeave =(evt: React.MouseEvent<SVGSVGElement>)=>{
        this.clearDrag()
    } 
    onMouseUp =(evt: React.MouseEvent<SVGSVGElement>)=>{
        var dragEnd = this.getMousePosition(evt)
        if (this.dragStart && dragEnd){
            // There has to be a movement in each direction
            if (this.dragStart.x != dragEnd.x && this.dragStart.y != dragEnd.y){
                const{onSelection} = this.props
                // Start and end might not be the position we need to use, we want to send to TopLeft and BottomRight coordinates
                onSelection( {
                    x:(this.dragStart.x < dragEnd.x)?this.dragStart.x:dragEnd.x, 
                    y:(this.dragStart.y < dragEnd.y)?this.dragStart.y:dragEnd.y
                }, {
                    x:(this.dragStart.x > dragEnd.x)?this.dragStart.x:dragEnd.x, 
                    y:(this.dragStart.y > dragEnd.y)?this.dragStart.y:dragEnd.y
                })
            }
        }        
        this.clearDrag()    
    }
    clearDrag=()=>{
        // the drag is over
        this.dragStart = undefined
        const canvas = this.myCanvasRef.current
        var ctx = canvas!.getContext('2d');
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);// clear the canvas
    }
    drawSelectionRectangle=(pt:DOMPoint)=>{
        if (this.dragStart){
            const canvas = this.myCanvasRef.current
            var ctx = canvas!.getContext('2d');
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);// clear the canvas
            // calculate the rectangle width/height based on starting vs current mouse position
            var width  = pt.x - this.dragStart.x;
            var height = pt.y - this.dragStart.y;

            // draw a new rect from the start position to the current mouse position
            ctx!.strokeRect(this.dragStart.x, this.dragStart.y, width, height)
        }
    }
    getMousePosition=(evt: React.MouseEvent<SVGSVGElement>):DOMPoint|undefined => {
        const svg = this.mySvgRef.current
        const pt = svg?.createSVGPoint()
        if (svg && pt){
            pt.x = evt.pageX; 
            pt.y = evt.pageY; // If we use the clientY then scrolling is not incorporated?
            return pt.matrixTransform(svg.getScreenCTM()?.inverse());// The cursor point, translated into svg coordinates
        }
        return undefined;
    }
    onMouseDown =(evt: React.MouseEvent<SVGSVGElement>)=>{ // ES6 format so we have a this without binding
        var pt = this.getMousePosition(evt)
        if (pt){
            console.log(`mousedown ${pt.x}, ${pt.y}`)
 
            // save the starting x/y of the rectangle
            this.dragStart = {x: pt.x, y: pt.y} // We can use the one reported by the SVG here since we generate them with the same dimensions
        }
    }
    renderOverlay(){
        const {height, width} = this.state
        // Both the Canvas and SVG heights are set to 100% using styling, here we set the actual size in pixels
        // (that will match the size of the image)
        if (height > 0 && width > 0){
            console.log(`render canvas with dimensions ${width}/${height}`)
            return(
                <div>
                    <canvas ref={this.myCanvasRef} id="canvas" width={width} height={height}></canvas>

                    <svg viewBox={`0 0 ${width} ${height}`} 
                        ref={this.mySvgRef}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onMouseMove={this.onMouseMove}
                        onMouseLeave={this.onMouseLeave}
                        >
                        {this.props.children}
                    </svg>
                </div>
            )
        } else {
            return null;
        }
    }
    
    render(): ReactNode {        
        return(
            <div className="img-overlay-wrap">
                {this.renderBackground()}   
                {this.renderOverlay()}
            </div>
        ) 
    }        
}
