import { Link, usePage } from "@inertiajs/react";
import DynamicHeroIcon from "@/Components/elements/icons/DynamicHeroIcon";
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function NavSingle({
    startWith,
    routeName,
    name,
    img,
    isSpecial,
}: {
    startWith?: string;
    routeName?: any;
    name: any;
    img: any;
    isSpecial: boolean;
}) {
    const { url } = usePage();

    function isActive(startWith?: string) {
        if (startWith == "/") {
            return url == startWith;
        } else {
            return url.startsWith(startWith ?? "");
        }
    }

    console.log(img);

    return (
        <div className="py-1 px-2">
            <Link
                href={routeName}
                className={classNames(
                    isActive(startWith)
                        ? " text-slate-100 shadow bg-red-900 "
                        : "text-slate-400 cursor-pointer hover:text-slate-300 hover:shadow hover:bg-red-600",
                    `group mt-0 flex p-3 rounded-lg items-center text-sm space-x-2 font-[700]  duration-300 ease-in-out transition-all w-full ${
                        isSpecial && "border border-dashed border-primary"
                    }  `
                )}
                aria-current={isActive(startWith) ? "page" : undefined}
            >
                <img
                    src={img}
                    className="w-8 h-8 object-contain"
                    alt="side link"
                />
                <span className="text-lg font-[600]">{name}</span>
            </Link>
        </div>
    );
}
