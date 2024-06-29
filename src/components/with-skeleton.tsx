import React from "react";

export function withSkeleton<T extends (props: any) => React.ReactNode>(
    Component: T,
    Skeleton: () => React.ReactNode,
    componentProps?: Parameters<T>[0]
) {
    if (componentProps) {
        const component = (props: Partial<Parameters<T>[0]>) => <Component {...componentProps} {...props}/>;
        component.displayName = 'HOC skeleton';
        return component;
    }

    return Skeleton;
}