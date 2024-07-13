import useClient from "./useClient.tsx";
import {useQuery} from "@tanstack/react-query";
import {getStyles} from "../model/queries/stylesDAO.ts";

function useStylesQuery(styleId: string) {
    const client = useClient();
    const queryKey = ['ar_styles', styleId];

    const queryFn = async () => {
        return getStyles(client).then(
            (result) => result.data
        );
    };

    return useQuery({ queryKey, queryFn });
}

export default useStylesQuery;