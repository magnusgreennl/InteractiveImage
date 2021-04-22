import { Component, ReactNode, createElement } from "react";
import { DynamicValue, WebImage, ValueStatus } from "mendix";

export interface ImageProps {
    image?: DynamicValue<WebImage>;
}

export class BackgroundImage extends Component<ImageProps> {
    render(): ReactNode {
        const {image} = this.props
        switch (image?.status){
            case ValueStatus.Loading:{
                return <div className="image">Loading...</div>;
            }
            case ValueStatus.Available:{
                return <img className="image" src={image.value.uri}/>; 
            }
            default:
               return <div className="image"></div>; 
        }
    }
}
