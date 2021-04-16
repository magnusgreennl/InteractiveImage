import { Component, ReactNode, createElement } from "react";

import { InteractiveImageContainerProps } from "../typings/InteractiveImageProps";
import { ValueStatus } from "mendix";

import "./ui/InteractiveImage.css";

import { BackgroundImage } from "./components/BackgroundImage";
import { Marker } from "./components/Marker";

export default class InteractiveImage extends Component<InteractiveImageContainerProps> {
    render(): ReactNode {
        const {bgImage, bgImage:test, data, coordinateTopX, coordinateTopY, coordinateBottomX, coordinateBottomY, actionOnClick} = this.props;        
        if (data?.status == ValueStatus.Available){
            return(
                <div> 
                    <BackgroundImage image={bgImage}/>
                    <map name="workmap">
                    {data?.items?.map((item) => {
// Mendix will compaint that we are not using Get(), however the current version of the pluggable widget does not yet support this...
// https://docs.mendix.com/apidocs-mxsdk/apidocs/client-apis-for-pluggable-widgets#get-function                        
                        const commonProps = {
                            coordinateTopX: Number(coordinateTopX(item).value?.toString()),
                            coordinateTopY: Number(coordinateTopY(item).value?.toString()),
                            coordinateBottomX: Number(coordinateBottomX(item).value?.toString()),
                            coordinateBottomY: Number(coordinateBottomY(item).value?.toString()),  
                            onClick: (event: React.MouseEvent<HTMLElement>) => {                          
                                let action = actionOnClick?.(item)
                                if (action?.canExecute)
                                    action.execute()
                                
                            }
                        };
                        return <Marker {...commonProps} />
                    })}
                </map>            
            </div>
            ) ;
        } else {
            return <div>Loading...</div>
        }
    }        
}
