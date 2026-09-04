// Actions Methods for Projects

// GET '/projects' - Muestra el Dashboard de proyectos
const showDashboard = (req, res) => {
    // Logic to retrieve and display dashboard data for projects
    res.send('Dashboard de proyectos 🚧 Under construction 🚧');
};

// GET '/projects/create' - Muestra el formulario para crear un nuevo proyecto
const showCreateForm = (req, res) => {
    // Logic to display the form for creating a new project
    res.send('Formulario para crear un nuevo proyecto 🚧 Under construction 🚧');
};

export default {
    showDashboard,
    showCreateForm
};
