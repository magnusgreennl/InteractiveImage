/**
 * This file was generated from InteractiveImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue, WebImage } from "mendix";

export interface InteractiveImageContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    bgImage?: DynamicValue<WebImage>;
    data?: ListValue;
    coordinateTopX: ListAttributeValue<BigJs.Big>;
    coordinateTopY: ListAttributeValue<BigJs.Big>;
    coordinateBottomX: ListAttributeValue<BigJs.Big>;
    coordinateBottomY: ListAttributeValue<BigJs.Big>;
    actionOnClick?: ListActionValue;
}

export interface InteractiveImagePreviewProps {
    class: string;
    style: string;
    bgImage: string;
    data: {} | null;
    coordinateTopX: string;
    coordinateTopY: string;
    coordinateBottomX: string;
    coordinateBottomY: string;
    actionOnClick: {} | null;
}
