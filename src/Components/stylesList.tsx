import useStylesQuery from "../hooks/useStylesQuery.tsx";

export function StylesList({ styleId }: {
    styleId: string;
}) {
    const {
        data: organization,
        isLoading,
        isError
    } = useStylesQuery(styleId);

    console.log(organization);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <h1>{organization}</h1>
        </div>
    );
}