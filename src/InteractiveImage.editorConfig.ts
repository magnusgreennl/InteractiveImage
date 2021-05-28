import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps
} from "./PageEditor"

import { InteractiveImagePreviewProps } from "../typings/InteractiveImageProps";
import Preview from "./Preview.svg"
/**
 * Provide custom visibility of the properties
 */
export function getProperties(
    values: InteractiveImagePreviewProps,
    defaultProperties: Properties,
    target: "web" | "desktop"
): Properties {
    /*
    if (target === "desktop") {
        if (values.bgImage) {
            hidePropertyIn(defaultProperties, values, "x");
        } else {
            hidePropertyIn(defaultProperties, values, "y");
        }
    }

    if (values.x) {
        hidePropertiesIn(defaultProperties, values, [
            "width",
            "height",
        ]);
    }
    */
    return defaultProperties;
}
/**
 * Provide custom errors to the widget
 */
export function check(values: InteractiveImagePreviewProps): Problem[] {
    const errors: Problem[] = [];
    /*
    if (!values.x) {
        errors.push({
            property: "x",
            message: "x is een verplicht veld",
        });
    }
    */
    return errors;
}

export function getPreview(values: InteractiveImagePreviewProps): StructurePreviewProps {
    console.log(Preview)
    return {
        type: "Image",
        document: decodeURIComponent(Preview.replace("data:image/svg+xml,", "")),
        width: 375,
        height: 375
    };
}
