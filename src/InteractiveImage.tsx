import { Component, ReactNode, createElement } from "react";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";
import { ValueStatus } from "mendix";

import "./ui/InteractiveImage.css";

import { BackgroundImage } from "./components/BackgroundImage";
import { Hotspot } from "./components/Hotspot";

// Mendix will compain that we are not using Get(), however the current version of the pluggable widget does not yet support this...
// https://docs.mendix.com/apidocs-mxsdk/apidocs/client-apis-for-pluggable-widgets#get-function     

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    render(): ReactNode {
        const {bgImage, bgImage:test, data, x, y, width, height, actionOnClick} = this.props;        
        if (data?.status == ValueStatus.Available){
            return(
                <div className="img-overlay-wrap">
                    <BackgroundImage image={bgImage}/>
                    <svg viewBox="0 0 1427 934">

                        {data?.items?.map((item) => {
                            const commonProps = {
                                x: Number(x(item).value?.toString()),
                                y: Number(y(item).value?.toString()),
                                width: Number(width(item).value?.toString()),
                                height: Number(height(item).value?.toString()),  
                                onClick: (event: React.MouseEvent<HTMLElement>) => {                          
                                    let action = actionOnClick?.(item)
                                    if (action?.canExecute)
                                        action.execute() 
                                    
                                }
                            };
                            return <Hotspot {...commonProps} />
                        })}
                    </svg>            
                </div>
            ) ;
        } else {
            return <div>Loading...</div>
        }
    }        
}
