/**
 * This file was generated from InteractiveImage.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, WebImage } from "mendix";

export interface InteractiveImageContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    bgImage?: DynamicValue<WebImage>;
}

export interface InteractiveImagePreviewProps {
    class: string;
    style: string;
    bgImage: string;
}
