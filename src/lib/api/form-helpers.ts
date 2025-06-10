export const getNumber = (formData: FormData, key: string) => {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim() !== "") {
        const n = Number(value);
        return isNaN(n) ? undefined : n;
    }
    return undefined;
};

export const getString = (formData: FormData, key: string) => {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim() !== "") {
        return value.trim();
    }

    return undefined;
}

export const getDate = (formData: FormData, key: string): Date | undefined => {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim() !== "") {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }

    return undefined;
};