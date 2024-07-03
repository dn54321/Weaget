import React from "react";
import { SkeletonProps } from "@src/types/component.types";

export function withSkeleton<
    T extends (props: any) => React.ReactNode,
    V extends (props: any) => React.ReactNode,
>(
    Component: T,
    Skeleton: V
) {
    const component = (props: Parameters<T>[0] | SkeletonProps | Parameters<V>[0]) => {
        if ("skeleton" in props && (props as SkeletonProps).skeleton === true) {
            const { skeleton, ...rest } = props as (Parameters<V>[0] & SkeletonProps);
            return <Skeleton {...rest as Parameters<V>[0]} />;
        }

        return <Component {...props as Parameters<T>[0]} />;
    };

    return component;
}
