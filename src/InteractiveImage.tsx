import { Component, ReactNode, createElement, createRef } from "react";
import ReactDOM from 'react-dom'

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";
import { ValueStatus, ObjectItem } from "mendix";

import "./ui/InteractiveImage.css";

import { Hotspot } from "./components/Hotspot";

// Mendix will compain that we are not using Get(), however the current version of the pluggable widget does not yet support this...
// https://docs.mendix.com/apidocs-mxsdk/apidocs/client-apis-for-pluggable-widgets#get-function     

export interface InteractiveImageState {
    width: number,
    height: number,
}

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    // Use a reference to determine the image height that will be used for the svg viewport
    private myImageRef = createRef<HTMLImageElement>();
    private _id: String;

    readonly state: InteractiveImageState = {
        height: 0,
        width: 0,
    };

    constructor(props:InteractiveImageContainerProps) {
        super(props);
        this.state = {height: 0, width: 0};
        this._id = this.props.name;
    }

    componentDidMount() {
        let id = ReactDOM.findDOMNode(this)?.nextElementSibling?.getAttribute("data-mendix-id")
        if (id) this._id = id
    }
    renderBackground() {
        const {bgImage} = this.props;
        // See if we have a background image available
        if (bgImage?.status == ValueStatus.Available){
            console.log(`${this._id}: rendering background`)
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
    /**
     * Render a single hotspot in the svg based on the ObjectItem
     * @param item ObjectItem
     * @returns JSX:Element
     */
    renderHotspot(item: ObjectItem){
        console.info(`${this._id}: rendering hotspot for item ${item.id}`)
        const { x, y, width, height, text, actionOnClick} = this.props;
        // These are defined as functions
        const commonProps = {
            x: Number(x(item).value?.toString()),
            y: Number(y(item).value?.toString()),
            width: Number(width(item).value?.toString()),
            height: Number(height(item).value?.toString()),
            text: text?.(item).value?.toString(), 
            onClick: (event: React.MouseEvent<HTMLElement>) => {                          
                let action = actionOnClick?.(item)
                if (action?.canExecute)
                    action.execute() 
            }
        }
        return <Hotspot {...commonProps} />    
    }

    renderOverlay(){
        const {data} = this.props
        const {height, width} = this.state

        if (data?.status == ValueStatus.Available && height > 0 && width > 0){
            console.info(`${this._id}: render overlay with dimensions ${width}/${height}`)
            return(
                    <svg viewBox={`0 0 ${width} ${height}`}>
                        {data?.items?.map((item) => {   // loop inside the jsx just to show how to do it
                            return this.renderHotspot(item)
                        })}
                    </svg>
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
