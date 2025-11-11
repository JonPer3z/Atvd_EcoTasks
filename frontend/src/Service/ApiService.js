import axios from "axios";

//Post
async function createTask(taskData) {
  try {
    
    const apiTaskData = {
      task_title: taskData.title,
      task_category: taskData.category,
      task_status: String(taskData.status) 
    };

    const response = await axios.post("http://10.110.12.61:8080/task/post", apiTaskData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar task no serviço:", error);
    throw error;
  }
}

//Get 
async function getTasks() {
  try {
    const response = await axios.get("http://10.110.12.61:8080/task/get");

    const tasks = response.data; 
    if (Array.isArray(tasks)) {
      const formattedTask = tasks.map((task) => {
        return {
          id: task.id,
          title: task.task_title,     
          category: task.task_category,
          status: task.task_status === 'true' 
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
    const response = await axios.delete(`http://10.110.12.61:8080/task/delete/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar task ${taskId}:`, error);
    throw error;
  }
}

async function updateTaskStatus(taskId, newStatus) {
  try {
    const statusString = String(newStatus);

    const response = await axios.put(
      `http://10.110.12.61:8080/task/update/status/${taskId}?status=${statusString}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status da task ${taskId}:`, error);
    throw error;
  }
}

export { getTasks, createTask, deleteTask, updateTaskStatus };