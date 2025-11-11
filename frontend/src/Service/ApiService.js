import axios from "axios";

//Post (Corrigido: Traduz de camelCase/boolean para snake_case/string)
async function createTask(taskData) {
  try {
    // taskData (do frontend) é: { title: "...", category: "...", status: false }
    const apiTaskData = {
      task_title: taskData.title,
      task_category: taskData.category,
      task_status: String(taskData.status) // Converte boolean 'false' para string "false"
    };

    const response = await axios.post("http://10.110.12.61:8080/task/post", apiTaskData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar task no serviço:", error);
    throw error;
  }
}

//Get (Corrigido: Traduz de snake_case/string para camelCase/boolean)
async function getTasks() {
  try {
    const response = await axios.get("http://10.110.12.61:8080/task/get");

    const tasks = response.data; // Vem do backend como task_title, task_status ("true" ou "false")

    if (Array.isArray(tasks)) {
      const formattedTask = tasks.map((task) => {
        return {
          id: task.id,
          title: task.task_title,     // Converte snake_case para camelCase
          category: task.task_category, // Converte snake_case para camelCase
          status: task.task_status === 'true' // Converte string "true" para boolean true
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

//Delete (Já estava OK)
async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`http://10.110.12.61:8080/task/delete/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar task ${taskId}:`, error);
    throw error;
  }
}

// NOVO: Adicionada a função PUT para atualizar o status
async function updateTaskStatus(taskId, newStatus) {
  try {
    // O backend espera o status como 'true' ou 'false'
    const statusString = String(newStatus); 
    
    // O endpoint é /update/status/{id}?status=...
    const response = await axios.put(
      `http://10.110.12.61:8080/task/update/status/${taskId}?status=${statusString}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status da task ${taskId}:`, error);
    throw error;
  }
}

// Exportar a nova função
export { getTasks, createTask, deleteTask, updateTaskStatus };