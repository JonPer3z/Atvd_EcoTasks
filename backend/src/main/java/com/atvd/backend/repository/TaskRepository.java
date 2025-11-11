package com.atvd.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.atvd.backend.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}