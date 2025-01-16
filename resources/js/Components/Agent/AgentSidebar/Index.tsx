import { agentNavigationLinks } from "@/lib/SideNavLinks";
import { canContinueArray } from "@/lib/utility";
import { User } from "@/types";
import { FC } from "react";
import NavMulti from "./partials/NavMulti";
import NavSeparator from "./partials/NavSeparator";
import NavSingle from "./partials/NavSingle";
import NavTitle from "./partials/NavTitle";

interface ISidebar {
    user: User;
}

const AgentSidebar: FC<ISidebar> = ({ user }) => {
    return (
        <>
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-[64px] lg:flex lg:w-[260px] lg:flex-col h-[100vh] fixed left-0 top-0 bottom-0">
                <div>
                    <img
                        src="/assets/images/sidebar/bgs/sidebar-1.png"
                        className="absolute inset-0 w-full h-full object-cover z-[-1] bg-center bg-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black to-red-900/90 backdrop-blur-[2px]" />
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="sticky h-full flex flex-col flex-grow pt-0 pb-4 overflow-y-auto">
                        <nav
                            className="sticky flex flex-col flex-1 overflow-revert scrollbar-track-rounded-full scrollbar-thumb-rounded-full overscroll-auto scroll-smooth scrollbar-thin "
                            aria-label="Sidebar"
                        >
                            <div className="pt-2">
                                {agentNavigationLinks.map(
                                    (item: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                {/* Multi Nav */}
                                                {item.link &&
                                                    item.children?.length > 0 &&
                                                    canContinueArray(
                                                        item.permissions,
                                                        user
                                                    ) && (
                                                        <NavMulti
                                                            name={item.name}
                                                            startWith={
                                                                item.startWith
                                                            }
                                                            icon={item.img}
                                                            children={
                                                                item.children
                                                            }
                                                        />
                                                    )}

                                                {/* Single nav */}
                                                {item.link &&
                                                    !item.children &&
                                                    canContinueArray(
                                                        item.permissions,
                                                        user
                                                    ) && (
                                                        <NavSingle
                                                            name={item.name}
                                                            startWith={
                                                                item.startWith
                                                            }
                                                            routeName={route(
                                                                item.route
                                                            )}
                                                            img={item.img}
                                                            isSpecial={
                                                                item.isSpecial
                                                            }
                                                        />
                                                    )}
                                                {/* Nav Seperator */}
                                                {!item.link &&
                                                    item.border &&
                                                    canContinueArray(
                                                        item.permissions,
                                                        user
                                                    ) && (
                                                        <NavSeparator
                                                            name={item.name}
                                                        />
                                                    )}
                                                {/* Nav Title */}
                                                {!item.link && !item.border && (
                                                    <NavTitle
                                                        name={item.name}
                                                    />
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AgentSidebar;