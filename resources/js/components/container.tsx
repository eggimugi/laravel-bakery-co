import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export function Container({ children, className }: Props) {
    return (
        <div className={cn("flex flex-1 flex-col gap-12 px-12 py-6", className)}>
            {children}
        </div>
    );
}