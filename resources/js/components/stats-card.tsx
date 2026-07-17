type Props = {
    title: string;
    value: number;
    unitValue?: string;
    className?: string;
};

export function StatsCard({ title, value, unitValue, className }: Props) {
    return (
        <div
            className={`flex w-full flex-col space-y-2 rounded-xl items-end ${className || ''}`}
        >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-2xl font-bold">
                {value}
                {unitValue && (
                    <span className="text-sm font-normal text-muted-foreground">
                        {' '}
                        /{unitValue}
                    </span>
                )}
            </p>
        </div>
    );
}
