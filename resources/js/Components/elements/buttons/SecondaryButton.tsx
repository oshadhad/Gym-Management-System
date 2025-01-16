import { InertiaLinkProps, Link } from "@inertiajs/react";
import { ButtonHTMLAttributes } from "react";

const classes =
    "inline-flex items-center px-4 py-1 bg-secondary border border-secondary rounded-md font-[700] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150";

const disabledClasses = "opacity-25 cursor-not-allowed";

export function SecondaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={` ${classes} ${
                disabled && disabledClasses
            }  ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export function SecondaryLink({
    className = "",
    disabled,
    children,
    href,
    ...props
}: InertiaLinkProps & {
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            {...props}
            className={` ${classes} ${
                disabled && disabledClasses
            } ${className}`}
            disabled={disabled}
        >
            {children}
        </Link>
    );
}