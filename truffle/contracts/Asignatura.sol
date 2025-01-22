// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/**
 *  El contrato Asignatura que representa una asignatura de la carrera.
 * 
 * Version Lite - Practicas
 *
 */

contract Asignatura {

    // Errores
    error NombreAsignaturaVacioError();
    error CursoAsignaturaVacioError();
    error ProfesorYaExisteError(address addr);
    error NombreProfesorVacioError(address addr);
    error NombreAlumnoVacioError(address addr);
    error NombreEvaluacionVacioError();
    error DNIAlumnoVacioError(address addr);
    error DNIDuplicadoError(address addr, string dni);
    error PermisosError(address addr, string detalles);
    error EvaluacionNoexisteError(uint evaluacionId);
    error CalificacionNoValidaError(address alumno, uint evaluacionId, uint calificacion);
    error AlumnoNoExisteError(address addr);
    error AsignaturaCerradaError();
    error DineroError(address addr);

    // Visibilidad de todas las propiedades publicas

    /// Dirección del usuario que ha creado/desplegado el contrato
    address public owner;

    /// Dirección de usuario del coordinador de la asignatura
    address public coordinador;

    /// Indica si la asignatura ya ha sido cerrada o no
    bool public cerrada;

    /// Nombre de la asignatura
    string public nombre;

    /// Curso académico
    string public curso;

    /// Datos de un alumno
    struct DatosAlumno {
        string nombre;
        string dni;
        string email;
    }

    /// Mapping de datos de alumnos
    mapping (address => DatosAlumno) public datosAlumno;

    // Mapping para guardar los DNIs utilizados y evitar duplicados
    mapping(string => bool) private dnisUsados;

    // Array público con las direcciones de usuario de los alumnos matriculados
    address[] public matriculas;

    /// Datos de una evaluación
    struct Evaluacion {
        string nombre;
        uint fecha;
        uint porcentaje;
        uint minimo;
    }

    /// Evaluaciones de la asignatura
    Evaluacion[] public evaluaciones;

    /// Tipos de notas
    enum TipoNota {Empty, NP, Normal}

    /// Datos de una nota
    struct Nota {
        TipoNota tipo;
        uint calificacion;
    }

    /// Calificaciones de los alumnos
    mapping (address => mapping (uint => Nota)) public calificaciones;

    // Mapping de nombres de profesores
    mapping(address => string) public datosProfesor;
    // Array público de direcciones de usuario de profesores
    address[] public profesores;

    // Eventos
    event MatriculaCreada(address indexed addr, string nombre, string dni, string email);
    event EvaluacionCreada(uint evaluacion, string nombre, uint fecha, uint porcentaje, uint minimo);
    event Calificacion(address indexed alumno, uint evaluacionId, TipoNota tipo, uint calificacion);
    event CoordinadorAsignado(address indexed addr);
    event AsignaturaCerrada();
    event ProfesorCreado(address indexed addr, string nombre);

    /**
     * Constructor.
     *
     * @param _nombre Nombre de la asignatura.
     * @param _curso  Curso académico.
     */
    constructor(string memory _nombre, string memory _curso) {
        if (bytes(_nombre).length == 0) revert NombreAsignaturaVacioError();
        if (bytes(_curso).length == 0) revert CursoAsignaturaVacioError();

        // Dirección del usuario que ha creado/desplegado el contrato
        owner = msg.sender;
        // Nombre de la asignatura @param _nombre 
        nombre = _nombre;
        // Curso académico @param _curso   
        curso = _curso;
        // Asignatura no cerrada
        cerrada = false;
    }

   // Devuelve el número de alumnos matriculados
    function matriculasLength() public view returns(uint) {
        return matriculas.length;
    }

    // Función de automatricula
    // @param _nombre El nombre del alumno.
    // @param _dni    El DNI del alumno.
    // @param _email  El email del alumno.
    function automatricula(string memory _nombre, string memory _dni, string memory _email) 
        soloNoMatriculados soloAbierta public {
        if (bytes(_nombre).length == 0) revert NombreAlumnoVacioError(msg.sender);
        if (bytes(_dni).length == 0) revert DNIAlumnoVacioError(msg.sender);
        if (dnisUsados[_dni]) revert DNIDuplicadoError(msg.sender, _dni);

        emit MatriculaCreada(msg.sender, _nombre, _dni, _email);

        DatosAlumno memory datos = DatosAlumno(_nombre, _dni, _email);
        datosAlumno[msg.sender] = datos;
        matriculas.push(msg.sender);
        dnisUsados[_dni] = true;
    }

    // Función de matricula
    // @param _addr   La dirección del alumno.
    // @param _nombre El nombre del alumno.
    // @param _dni    El DNI del alumno.    
    // @param _email  El email del alumno.
    function matricular(address _addr, string memory _nombre, string memory _dni, string memory _email) 
        soloOwner soloAbierta public {
        if (bytes(_nombre).length == 0) revert NombreAlumnoVacioError(_addr);
        if (bytes(_dni).length == 0) revert DNIAlumnoVacioError(_addr);
        if (dnisUsados[_dni]) revert DNIDuplicadoError(_addr, _dni);

        emit MatriculaCreada(_addr, _nombre, _dni, _email);

        DatosAlumno memory datos = DatosAlumno(_nombre, _dni, _email);
        datosAlumno[_addr] = datos;
        matriculas.push(_addr);
        dnisUsados[_dni] = true;
    }

    // Añadir un profesor a la asignatura
    // @param addr Dirección del profesor 
    // @param profesorNombre Nombre del profesor
    function addProfesor(address addr, string memory profesorNombre) soloOwner public {
        // Comprobar que el profesor no existe
        if (bytes(datosProfesor[addr]).length > 0) revert ProfesorYaExisteError(addr);
        // Comprobar que el nombre no esté vacío
        if (bytes(profesorNombre).length == 0) revert NombreProfesorVacioError(addr);

        datosProfesor[addr] = profesorNombre;
        profesores.push(addr);

        emit ProfesorCreado(addr, profesorNombre);
    }

    // Devuelve el número de profesores añadidos
    function profesoresLength() public view returns (uint) {
        return profesores.length;
    }


    // Modificadores
    modifier soloOwner() {
        require(msg.sender == owner, "Solo permitido al owner");
        _;
    }

    modifier soloCoordinador() {
        require(msg.sender == coordinador, "Solo permitido al coordinador");
        _;
    }

    modifier soloProfesor() {
        // Asegurarse de que el msg.sender sea un profesor.
        require(bytes(datosProfesor[msg.sender]).length > 0, "Solo permitido a profesores");
        _;
    }

    modifier soloMatriculados() {
        require(estaMatriculado(msg.sender), "Solo permitido a alumnos matriculados");
        _;
    }

    modifier soloNoMatriculados() {
        require(!estaMatriculado(msg.sender), "Solo permitido a alumnos no matriculados");
        _;
    }

    modifier soloAbierta() {
        require(!cerrada, "Asignatura cerrada");
        _;
    }

    // Devuelve el nombre, DNI y email del alumno
    function quienSoy() soloMatriculados public view returns (string memory _nombre, string memory _dni, string memory _email) {
        DatosAlumno memory datos = datosAlumno[msg.sender];
        return (datos.nombre, datos.dni, datos.email);
    }

    function creaEvaluacion(string memory _nombre, uint _fecha, uint _porcentaje, uint _minimo) 
        soloCoordinador soloAbierta public returns (uint) {
        if (bytes(_nombre).length == 0) revert NombreEvaluacionVacioError();

        emit EvaluacionCreada(evaluaciones.length, _nombre, _fecha, _porcentaje, _minimo);
        evaluaciones.push(Evaluacion(_nombre, _fecha, _porcentaje, _minimo));
        return evaluaciones.length - 1;
    }

    function evaluacionesLength() public view returns(uint) {
        return evaluaciones.length;
    }

    function califica(address alumno, uint evaluacionId, TipoNota tipo, uint calificacion) 
        soloProfesor public {
        require(estaMatriculado(alumno), "Solo se pueden calificar a un alumno matriculado.");
        require(evaluacionId < evaluaciones.length, "No se puede calificar una evaluacion que no existe.");
        
        if (calificacion > 1000) revert CalificacionNoValidaError(alumno, evaluacionId, calificacion);

        emit Calificacion(alumno, evaluacionId, tipo, calificacion);

        Nota memory nota = Nota(tipo, calificacion);
        calificaciones[alumno][evaluacionId] = nota;
    }

    function miNota(uint evaluacionId) soloMatriculados public view returns (TipoNota tipo, uint calificacion) {
        Nota memory nota = calificaciones[msg.sender][evaluacionId];
        return (nota.tipo, nota.calificacion);
    }

    // Cerrar la asignatura
    function cerrar() soloCoordinador public {
        cerrada = true;
        emit AsignaturaCerrada();
    }

   // Cambiar la dirección de usuario del coordinador de una asignatura
    function setCoordinador(address addr) soloOwner public {
        coordinador = addr;
        emit CoordinadorAsignado(addr);
    }

    function miNotaFinal() public soloMatriculados view returns (TipoNota, uint calificacionFinal) {
        TipoNota tipoFinal = TipoNota.Empty;
        calificacionFinal = 0;
        bool hasNP = false;
        uint notacont = 0; // Mover notacont fuera del bucle para contar notas NP

        for (uint i = 0; i < evaluaciones.length; i++) {
            Nota memory nota = calificaciones[msg.sender][i];

            if (nota.tipo == TipoNota.Empty) {
                return (TipoNota.Empty, 0);
            } else if (nota.tipo == TipoNota.Normal) {
                calificacionFinal += (nota.calificacion * evaluaciones[i].porcentaje) / 100;
                tipoFinal = TipoNota.Normal;
            } else if (nota.tipo == TipoNota.NP) {
                notacont += 1;
                hasNP = true;
                tipoFinal = TipoNota.NP;
            }
        }   

        // Verifica si todas las notas son NP, en ese caso, la nota final es NP
        if (notacont == evaluaciones.length) {
            return (TipoNota.NP, 0);
        }

        // Limita la calificación final a 499 si hay alguna NP
        if (calificacionFinal > 499 && hasNP) {
            calificacionFinal = 499;
        tipoFinal = TipoNota.Normal;
        }

        return (tipoFinal, calificacionFinal);
    }


    function notaFinal(address alumno) public soloCoordinador view returns (TipoNota tipoFinal, uint calificacionFinal) {
        tipoFinal = TipoNota.Empty;
        calificacionFinal = 0;
        bool hasNP= false;
        uint notacont = 0; // Mover notacont fuera del bucle para contar notas NP

        for (uint i = 0; i < evaluaciones.length; i++) {
            Nota memory nota = calificaciones[alumno][i];

            if (nota.tipo == TipoNota.Empty) {
                return (TipoNota.Empty, 0);
            } else if (nota.tipo == TipoNota.Normal) {
                calificacionFinal += (nota.calificacion * evaluaciones[i].porcentaje) / 100;
                tipoFinal = TipoNota.Normal;
            } else if (nota.tipo == TipoNota.NP) {
                notacont += 1;
                hasNP = true;
                tipoFinal = TipoNota.NP;
            }
        }

        // Verifica si todas las notas son NP, en ese caso, la nota final es NP
        if (notacont == evaluaciones.length) {
            return (TipoNota.NP, 0);
        }

        // Limita la calificación final a 499 si hay alguna NP
        if (calificacionFinal > 499 && hasNP) {
            calificacionFinal = 499;
            tipoFinal = TipoNota.Normal;
        }

        return (tipoFinal, calificacionFinal);
    }

    function estaMatriculado(address addr) internal view returns(bool) {
        return bytes(datosAlumno[addr].nombre).length > 0;
    }

    receive() external payable {
        revert DineroError(msg.sender);
    }
}
