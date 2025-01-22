
import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoyCoordinador = ({children}) => {

    const account = useAccount();

    const {
        data: coordinador,
        error,
        isError,
        isPending,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'coordinador',
        args: []
    });

    if (coordinador && coordinador === account.address) {
        return <>
         {children}
        </>    
    }
    return null;

};

export default SoyCoordinador;
