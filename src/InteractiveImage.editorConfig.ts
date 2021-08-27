/**
 * Based on the code in datagrdi-web
 * https://github.com/mendix/widgets-resources/blob/master/packages/pluggableWidgets/datagrid-web/src/Datagrid.editorConfig.ts
 * Since that one is based on a mono-repository we copied the contents of  
 * "widgets-resources\packages\tools\piw-utils-internal\dist" to the folder "EditorConfig\dist"
 * and updated the import statement 
 */

import {
    changePropertyIn,
    ContainerProps,
    DropZoneProps,
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    RowLayoutProps,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "./EditorConfig/dist";
import { InteractiveImagePreviewProps } from "../typings/InteractiveImageProps";

export function getProperties(
    values: InteractiveImagePreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    return defaultProperties;
}