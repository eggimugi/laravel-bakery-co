export function formatTime(
    date: string | Date,
    locale = 'en-US'
): string {
    return new Date(date).toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    });
}