import { Link, usePage } from "@inertiajs/react";
import NavSeparator from "./NavSeparator";
import NavTitle from "./NavTitle";
import NavMulti from "./NavMulti";
import NavSingle from "./NavSingle";
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const NavItem = ({
    startWith,
    routeName,
    name,
    link,
    border,
    img,
    children,
    isSpecial,
}: {
    startWith?: string;
    routeName?: any;
    name: any;
    link: boolean;
    border: boolean;
    img: any;
    children: any;
    isSpecial: boolean;
}) => {
    const { url, component } = usePage();

    function isActive(startWith?: string) {
        if (startWith == "/") {
            return url == startWith;
        } else {
            return url.startsWith(startWith ?? "");
        }
    }

    return (
        <>
            {link ? (
                children?.length > 0 ? (
                    <NavMulti
                        name={name}
                        startWith={startWith}
                        icon={img}
                        children={children}
                    />
                ) : (
                    <NavSingle
                        name={name}
                        startWith={startWith}
                        routeName={routeName}
                        img={img}
                        isSpecial={isSpecial}
                    />
                )
            ) : border ? (
                <NavSeparator name={name} />
            ) : (
                <NavTitle name={name} />
            )}
        </>
    );
};
export default NavItem;
// canContinue(item.permission, user) && ()