import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Main.css';

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState({ name: '', description: '' });
    const [editSubject, setEditSubject] = useState(null);
    const role = localStorage.getItem('role'); // Obtém o papel do usuário (student ou teacher)

    // Fetch inicial das disciplinas
    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/subjects', newSubject);
            setSubjects([...subjects, response.data]);
            setNewSubject({ name: '', description: '' }); // Limpa o formulário
        } catch (error) {
            console.error("Erro ao criar disciplina:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/subjects/${editSubject.id}`, editSubject);
            setSubjects(subjects.map((s) => (s.id === editSubject.id ? response.data : s)));
            setEditSubject(null); // Fecha o modo de edição
        } catch (error) {
            console.error("Erro ao editar disciplina:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/subjects/${id}`);
            setSubjects(subjects.filter((s) => s.id !== id));
        } catch (error) {
            console.error("Erro ao excluir disciplina:", error);
        }
    };

    return (
        <div>
            <h2>Disciplinas</h2>

            {/* Apenas professores podem criar disciplinas */}
            {role === 'teacher' && (
                <div className="form-create">
                    <input
                        type="text"
                        placeholder="Nome da disciplina"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={newSubject.description}
                        onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                    />
                    <button onClick={handleCreate}>Criar</button>
                </div>
            )}

            {/* Lista de disciplinas */}
            {subjects.map((subject) => (
                <div className="card" key={subject.id}>
                    {editSubject?.id === subject.id ? (
                        <div>
                            {role === 'teacher' ? ( // Apenas professores podem editar
                                <>
                                    <input
                                        type="text"
                                        value={editSubject.name}
                                        onChange={(e) => setEditSubject({ ...editSubject, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        value={editSubject.description}
                                        onChange={(e) => setEditSubject({ ...editSubject, description: e.target.value })}
                                    />
                                    <button onClick={handleUpdate}>Salvar</button>
                                    <button onClick={() => setEditSubject(null)}>Cancelar</button>
                                </>
                            ) : (
                                <p>Você não tem permissão para editar esta disciplina.</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h3>{subject.name}</h3>
                            <p>{subject.description}</p>

                            {/* Apenas professores podem excluir */}
                            {role === 'teacher' && (
                                <div className="card-actions">
                                    <button onClick={() => setEditSubject(subject)}>Editar</button>
                                    <button onClick={() => handleDelete(subject.id)}>Excluir</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
