package com.hraps.blocklogic.service;

import java.util.ArrayList;

public class TaskService {
    ArrayList<Task> taskList = new ArrayList<Task>();

    public void addTask(Task task){
        taskList.add(task);
    }

    public Task getTask(){
        for(Task task : taskList){
            if(task.id == -1){
                return task;
            }
        }
        return null;
    }

    public void removeTask(Task task){
        taskList.remove(task);
    }

    public void updateTaskResult(Task task, TaskResult result){
        task.results.add(result);
    }
}
