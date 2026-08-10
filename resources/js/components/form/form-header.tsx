export function FormHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold capitalize">{title}</h1>
            <p className="text-muted">{description}</p>
        </div>
    );
}