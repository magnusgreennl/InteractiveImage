import { Component, ReactNode, createElement, createRef } from "react"
import ReactDOM from 'react-dom'

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps"
import { ValueStatus, ObjectItem } from "mendix"

import "./ui/InteractiveImage.css"

import { Hotspot } from "./components/Hotspot"
import ImageCanvas, {Point} from "./ImageCanvas"

// Mendix will compain that we are not using Get(), however the current version of the pluggable widget does not yet support this...
// https://docs.mendix.com/apidocs-mxsdk/apidocs/client-apis-for-pluggable-widgets#get-function

// If you are building the widget using "npm run dev" (which you should) and you get unexplainable errors kill and restart the process
// This seems to happen most oftern after updating the XML and/or the interface declarations (probably a caching issue)

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    private _id: string

    constructor(props:InteractiveImageContainerProps) {
        super(props);
        this._id = this.props.name
    }

    componentDidMount() {
        let id = ReactDOM.findDOMNode(this)?.nextElementSibling?.getAttribute("data-mendix-id")
        if (id) this._id = id
    }
    getAvailability = (item:ObjectItem):boolean|undefined =>{
        // Since the pluggable widget does not allow us to execute a nanoflow to retreive or check additional data of an object
        // we are passing the unavailable objects as a separate list

        const {unavailable} = this.props
        let availability:boolean|undefined = undefined;
        if (unavailable?.status == ValueStatus.Available){
            const items = unavailable.items?.filter(unavailableItem => {
                return unavailableItem.id == item.id
            }) // a return is required id we use {} as the function
            availability = items && items.length > 0
        }   
        return availability;
    }
    /**
     * Render a single hotspot in the svg based on the ObjectItem
     * @param item ObjectItem
     * @returns JSX:Element
     */
    renderHotspot(item: ObjectItem){
        console.log(`${this._id}: rendering hotspot for item ${item.id}`)
        const { x, y, width, height, text, actionOnClick} = this.props // The ListAttributeValue and ListAttrbuteAction are functions defined by Mendix
                const commonProps = { // Construct a new props object that we can pass to the Hotspot component
            x: Number(x(item).value?.valueOf()), // Since the Big.ValueOf() returns a string we still need to parse it to a Number
            y: Number(y(item).value?.valueOf()),
            width: Number(width(item).value?.valueOf()),
            height: Number(height(item).value?.valueOf()),
            text: text?.(item).value?.valueOf(),    // var? is an easy way to handle possible undefined objects
            availability: this.getAvailability(item), 
            onClick: (event: React.MouseEvent<HTMLElement>) => {                          
                let action = actionOnClick?.(item)
                if (action?.canExecute)
                    action.execute() 
            }
        }
        return <Hotspot {...commonProps} />
    }
    onSelection=(topLeft:Point, bottomRight:Point):void=>{
        const {selectionFeedback} = this.props
        // We store the positions as a single JSON string this has onChange event
        // we round the number to an integer
        selectionFeedback?.setValue(JSON.stringify({
            topLeft:{
                x:parseInt(topLeft.x.toFixed(0)), 
                y:parseInt(topLeft.y.toFixed(0))
            }, 
            bottomRight:{
                x:parseInt(bottomRight.x.toFixed(0)), 
                y:parseInt(bottomRight.y.toFixed(0))
            }
        }));
    }
    render(): ReactNode {
        const {data, bgImage} = this.props
        if (data?.status == ValueStatus.Available)
        return(            
            <div className="img-overlay-wrap">
                <ImageCanvas bgImage={bgImage} onSelection={this.onSelection}>
                    {data?.items?.map((item) => {   // loop inside the jsx just to show how to do it
                        return this.renderHotspot(item)
                    })}
                </ImageCanvas>
            </div>
        ) 
        return <div className="img-overlay-wrap">Loading...</div>
    }        
}
