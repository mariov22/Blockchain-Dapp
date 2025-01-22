
import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoyOwner = ({children}) => {

    const account = useAccount();

    const {
        data: owner,
        error,
        isError,
        isPending,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'owner',
        args: []
    });

    if (owner && owner === account.address) {
        return <>
         {children}
        </>    
    }
    return null;

};

export default SoyOwner;
