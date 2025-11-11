import axios from "axios";

//Post
async function createTask(taskData) {
  try {
    const response = await axios.post("http://localhost:3000/task", taskData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar task no serviço:", error);
    throw error;
  }
}

//Get
async function getTasks() {
  try {
    const response = await axios.get("http://localhost:3000/task/get");

    const tasks = response.data;

    if (Array.isArray(tasks)) {
      const formattedTask = tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          category: task.category,
          status: task.status,
        };
      });

      return formattedTask;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar tasks no serviço:", error);
    return [];
  }
}

//Delete
async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`http://localhost:3000/task/delete/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar task ${taskId}:`, error);
    throw error;
  }
}

export { getTasks, createTask, deleteTask };
