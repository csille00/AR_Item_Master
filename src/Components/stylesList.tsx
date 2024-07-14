// import useStylesQuery from "../hooks/useStylesQuery.tsx";
import { useEffect, useState } from "react";
import { getStylesFromClient } from "../model/queries/stylesDAO"; // Adjust path based on your actual file structure

interface Style {
    style_id: number;
    style_name: string;
    // Define other fields based on your styles table schema
}

function StylesList() {
    const [styles, setStyles] = useState<Style[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Loading state

    useEffect(() => {
        getStyles();
    }, []);

    async function getStyles() {
        try {
            const data = await getStylesFromClient()
        if(!data) return
        setStyles(data);
        } catch (error){
            setError((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <p>Loading...</p>; // Display loading message or spinner while fetching data
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ul>
            {styles.map((style) => (
                <li key={style.style_id}>{style.style_name}</li>
            ))}
        </ul>
    );
}

export default StylesList;
    // const {
    //     data: organization,
    //     isLoading,
    //     isError
    // } = useStylesQuery(styleId);
    //
    // console.log(organization);
    //
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (isError) {
    //     return <div>Error</div>;
    // }
    //
    // return (
    //     <div>
    //         <h1>{organization}</h1>
    //     </div>
    // );
// }