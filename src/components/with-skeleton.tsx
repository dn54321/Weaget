import React, { ReactElement } from "react";

export interface SkeletonProps {
    skeleton: boolean
}

export function withSkeleton<
    T extends (props: ReactElement["props"]) => React.ReactNode,
    V extends (props: ReactElement["props"]) => React.ReactNode
>(
    Component: T,
    Skeleton: V
) {
    const component = (props: Parameters<T>[0] | Parameters<V>[0] | SkeletonProps) => {
        if ("skeleton" in props && (props as SkeletonProps).skeleton === true) {
            return <Skeleton {...props as Parameters<V>[0]["props"]} />;
        }

        return <Component {...props as Parameters<T>[0]["props"]} />;
    };

    return component;
}
