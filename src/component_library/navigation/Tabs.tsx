import { tv } from "tailwind-variants";
import { useNavigate } from "react-router";
import { StyleSystemProps } from "../types.ts";
import React from 'react';

interface TabElement {
    name: string;
    url: string;
    pathname: string;
    icon?: React.ReactNode;
}

interface Props extends StyleSystemProps {
    elements: TabElement[];
}

const tabNavigationStyle = tv({
    base: "",
    slots: {
        container: "text-gray-500 w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7",
        tab: "border-none bg-none cursor-pointer group transition-colors duration-500 pt-2 rounded-t-xl",
        link: "w-full flex justify-center border-none bg-none cursor-pointer transition-colors items-center gap-2",
        activeLink: "font-semibold",
        separator: "mt-2 w-full bg-gray-100 h-[2px]",
        bottomSeparator: "w-full bg-gray-100 h-[2px] mt-[-2px]",
        activeSeparator: ""
    },
    variants: {
        colorSchema: {
            brand_primary: {
                link: "group-hover:text-brand_primary-500",
                activeLink: "!text-brand_primary-500",
                separator: "bg-gray-100",
                activeSeparator: "!bg-brand_primary-500",
            },
            brand_secondary: {
                link: "group-hover:text-brand_secondary-500",
                activeLink: "!text-brand_secondary-500",
                separator: "bg-gray-100",
                activeSeparator: "!bg-brand_secondary-500",
            },
            primary: {},
            secondary: {}
        },
        size: {
            sm: { container: "text-xs" },
            md: { container: "text-base" },
            lg: { container: "text-lg" },
            xl: { container: "text-xl" },
        },
    },
    defaultVariants: { colorSchema: "brand_primary", size: "md" },
});

function TabNavigation({ elements, size, colorSchema }: Props) {
    const navigate = useNavigate();
    const styles = tabNavigationStyle({ size, colorSchema });

    return (
        <div className={styles.base()}>
            <div className={styles.container()}>
                {elements.map(({ name, url, pathname, icon }) => {
                    const isActive = location.pathname.includes(pathname);
                    return (
                        <div key={name} className={styles.tab()} onClick={() => navigate(url)}>
                            <a className={`${styles.link()} ${isActive && styles.activeLink()}`}>
                                {icon}
                                {name}
                            </a>
                            <div className={`${styles.separator()} ${isActive && styles.activeSeparator()}`} />
                        </div>
                    );
                })}
            </div>
            <div className={styles.bottomSeparator()} />
        </div>
    );
}

export default TabNavigation;
