
import {useReadContract} from 'wagmi'

import asignatura from "../Asignatura.json";

const Header = () => {

    const {
        data: nombre
    } = useReadContract({
        ...asignatura,
        functionName: 'nombre'
    });

    const {
        data: curso
    } = useReadContract({
        ...asignatura, functionName: 'curso'
    });

    return (
        <header className="AppHeader">
            <h1>
                Asignatura Full: {nombre}-<em>{curso}</em>
            </h1>
        </header>
    );
};

export default Header;
