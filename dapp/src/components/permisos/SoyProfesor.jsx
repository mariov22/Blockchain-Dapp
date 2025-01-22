
import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoyProfesor = ({children}) => {

    const account = useAccount();

    const {
        data: profesor,
        error,
        isError,
        isPending,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'datosProfesor',
        args: [account?.address?.toLowerCase()]
    });

    if (!profesor) {
        return null;
    }
    return <>
        {children}
    </>

};

export default SoyProfesor;
