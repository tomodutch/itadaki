export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = 5000
): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    // If the caller passed a signal, combine it with our timeout signal
    const signals = [controller.signal];
    if (options.signal) signals.push(options.signal);

    const finalController = new AbortController();
    signals.forEach((s) =>
        s.addEventListener("abort", () => finalController.abort())
    );

    try {
        const response = await fetch(url, {
            ...options,
            signal: finalController.signal,
        });
        clearTimeout(timeout);
        return response;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}