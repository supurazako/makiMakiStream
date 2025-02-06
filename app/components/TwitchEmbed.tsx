import React from "react";

export interface TwitchEmbedProps extends React.IframeHTMLAttributes<HTMLDivElement> {
    allowFullScreen?: boolean;
    autoPlay?: boolean;
    channel?: string;
    video?: string;
    collection?: string;
    height?: number | string;
    width?: number | string;
    layout?: string;
    muted?: boolean;
    parent?: string[];
    theme?: string;
    time?: string;
}
