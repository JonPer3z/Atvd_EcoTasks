package com.atvd.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atvd.backend.entity.Task;
import com.atvd.backend.repository.TaskRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    TaskRepository tasksRepository;

    @GetMapping("/get")
    public ResponseEntity<List<Task>> findAll() {
        List<Task> tasks = tasksRepository.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/post")
    public ResponseEntity<String> create(@RequestBody Task task) {
        Task saved = tasksRepository.save(task);
        URI location = URI.create("/post/" + saved.getId());

        return ResponseEntity.created(location).body("Salvo com sucesso!");
    }

    @PutMapping("update/status/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestParam String status) {
        Optional<Task> optionalTask = tasksRepository.findById(id);

        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTask_status(status);

            Task updateTask = tasksRepository.save(existingTask);

            return ResponseEntity.ok(updateTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        if (tasksRepository.existsById(id)) {
            tasksRepository.deleteById(id);
            return ResponseEntity.ok().body("deletado com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}