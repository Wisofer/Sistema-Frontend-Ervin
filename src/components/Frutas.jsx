import { useState, useEffect } from 'react';

const Frutas = () => {
    const [frutas, setFrutas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/frutas')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((data) => {
                setFrutas(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando frutas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Frutas</h1>
            <ul>
                {frutas.map((fruta) => (
                    <li key={fruta.id}>
                        {fruta.nombre} - {fruta.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Frutas;
