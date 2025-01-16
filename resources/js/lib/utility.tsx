import { User } from "@/types";

export function removeValueFromArray(arr: any, value: string) {
    var index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export function snakeToTitle(snakeCase: string): string {
    // Split the snake_case string by underscores
    const words = snakeCase.split("_");

    // Capitalize the first letter of each word and join them with a space
    const titleCase = words
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

    return titleCase;
}

export function canContinue(permission: string, user: User) {
    return permission == ""
        ? true
        : user.perms?.includes(permission)
        ? true
        : false;
}

export function canContinueArray(permissions: string[], user: User) {
    return permissions?.length>0?permissions.some((r) => user.perms?.includes(r)):true;
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}


export const moods = [
    {
        id: 1,
        title: "Superb",
        description: "Last message sent an hour ago",
        users: "621 users",
    },
    {
        id: 2,
        title: "Great",
        description: "Last message sent 2 weeks ago",
        users: "1200 users",
    },
    {
        id: 3,
        title: "Normal",
        description: "Last message sent 4 days ago",
        users: "2740 users",
    },
    {
        id: 4,
        title: "Less than Normal",
        description: "Last message sent 4 days ago",
        users: "2740 users",
    },
    {
        id: 5,
        title: "Not good",
        description: "Last message sent 4 days ago",
        users: "2740 users",
    },
];

export function formatMoney(
    amount: number,
    currencySymbol: string = "$",
    decimalCount: number = 2,
    locale: string = "en-US"
): string {
    // Ensure that decimalCount is non-negative
    if (decimalCount < 0) decimalCount = 0;

    // Create options for the number formatting
    const options: Intl.NumberFormatOptions = {
        style: "currency",
        currency: currencySymbol,
        minimumFractionDigits: decimalCount,
        maximumFractionDigits: decimalCount,
    };

    // Format the number using the specified locale and options
    return new Intl.NumberFormat(locale, options).format(amount);
}
