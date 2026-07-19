import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export function Container({ children, className }: Props) {
    return (
        <div className={cn("flex flex-1 flex-col gap-6 rounded-xl p-6", className)}>
            {children}
        </div>
    );
}