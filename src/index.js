import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const BookReviewApp = () => {
    const [reseñas, setReseñas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [textoReseña, setTextoReseña] = useState("");

    useEffect(() => {
        const claves = Object.keys(localStorage);
        const todasReseñas = claves.map((clave) => ({
            titulo: clave,
            ...JSON.parse(localStorage.getItem(clave))
        }));
        setReseñas(todasReseñas);
    }, []);

    const agregarReseña = () => {
        if (titulo && autor && textoReseña) {
            const nuevaReseña = { autor, texto: textoReseña };
            localStorage.setItem(titulo, JSON.stringify(nuevaReseña));
            setReseñas([...reseñas, { titulo, ...nuevaReseña }]);
            setTitulo("");
            setAutor("");
            setTextoReseña("");
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

    return (
        <div>
            <h1>BookReview - Gestión de Reseñas</h1>
            <h2>Agregar Nueva Reseña</h2>
            <div>
                <input
                    type="text"
                    placeholder="Título del libro"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Autor del libro"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <textarea
                    placeholder="Escribe tu reseña"
                    value={textoReseña}
                    onChange={(e) => setTextoReseña(e.target.value)}
                ></textarea>
                <button onClick={agregarReseña}>Guardar Reseña</button>
            </div>
            <h2>Reseñas Guardadas</h2>
            {reseñas.length > 0 ? (
                <ul>
                    {reseñas.map((reseña, index) => (
                        <li key={index}>
                            <strong>{reseña.titulo}</strong> - {reseña.autor}
                            <p>{reseña.texto}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay reseñas guardadas.</p>
            )}
        </div>
    );
};

ReactDOM.render(<BookReviewApp />, document.getElementById('root'));
