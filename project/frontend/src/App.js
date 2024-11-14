import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para buscar projetos do backend com opção de filtragem
  useEffect(() => {
    axios.get(`http://localhost:5000/projects?search=${searchTerm}`)
      .then(response => setProjects(response.data))
      .catch(error => console.error('Erro ao buscar projetos:', error));
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProject = () => {
    axios.post('http://localhost:5000/projects', newProject)
      .then(response => {
        setProjects([...projects, { ...newProject, _id: response.data }]);
        setNewProject({ name: '', description: '' });
        scrollToSection('projectList');
      })
      .catch(error => console.error('Erro ao adicionar projeto:', error));
  };

  const handleDeleteProject = (projectId) => {
    axios.delete(`http://localhost:5000/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter(project => project._id !== projectId));
      })
      .catch(error => console.error('Erro ao deletar projeto:', error));
  };

  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setNewProject({ name: project.name, description: project.description });
    scrollToSection(`updateProject_${project._id}`);
  };

  const handleUpdateProject = () => {
    axios.put(`http://localhost:5000/projects/${editingProject}`, newProject)
      .then(() => {
        setProjects(projects.map(project => (
          project._id === editingProject ? { ...project, ...newProject } : project
        )));
        setEditingProject(null);
        setNewProject({ name: '', description: '' });
      })
      .catch(error => console.error('Erro ao atualizar projeto:', error));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav style={{ backgroundColor: '#f5f5f5', padding: '10px', marginBottom: '20px' }}>
        <button onClick={() => scrollToSection('projectList')}>Lista de Projetos</button>
        <button onClick={() => scrollToSection('addProject')}>Adicionar Projeto</button>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginLeft: '10px' }}
        />
      </nav>

      <section id="projectList">
        <h2>Lista de Projetos - Escola Conectada</h2>
        {projects.length === 0 ? (
          <p>Nenhum projeto encontrado.</p>
        ) : (
          <ul>
            {projects.map((project, index) => (
              <li key={project._id}>
                <strong>{index + 1}. Nome:</strong> {project.name}
                <br />
                <strong>Descrição:</strong> {project.description}
                <br />
                <button onClick={() => handleDeleteProject(project._id)}>Deletar</button>
                <button onClick={() => handleEditProject(project)}>Editar</button>
                {editingProject === project._id && (
                  <section id={`updateProject_${project._id}`} style={{ marginTop: '20px' }}>
                    <h3>Atualizar Projeto</h3>
                    <input
                      type="text"
                      name="name"
                      value={newProject.name}
                      onChange={handleInputChange}
                      placeholder="Nome do Projeto"
                    />
                    <br />
                    <input
                      type="text"
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      placeholder="Descrição do Projeto"
                    />
                    <br />
                    <button onClick={handleUpdateProject}>Salvar Alterações</button>
                  </section>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="addProject" style={{ marginTop: '50px' }}>
        <h2>Adicionar Novo Projeto</h2>
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Nome do Projeto"
        />
        <br />
        <input
          type="text"
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Descrição do Projeto"
        />
        <br />
        <button onClick={handleAddProject}>Adicionar Projeto</button>
      </section>
    </div>
  );
}

export default App;
