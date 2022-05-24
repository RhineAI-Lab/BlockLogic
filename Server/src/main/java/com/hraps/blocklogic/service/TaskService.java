package com.hraps.blocklogic.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class TaskService {
    static boolean useLog = true;

    static String bid = (new Date().getTime()+"").substring(4,10);
    ArrayList<Task> taskList = new ArrayList<>();

    int taskStartId = 0;

    public void addTask(String ip, String user, String code, String name) {
        Task task = new Task(bid+"-"+taskStartId, name, user, ip, code);
        taskList.add(task);
        println("AddTask: "+task.describeMsg());
    }

    public Task getWaitedTask() {
        for (Task task : taskList) {
            if (task.state.equals(TaskState.WAITING)) {
                task.state = TaskState.RUNNING;
                println("RunTask: "+task.describeMsg());
                return task;
            }
        }
        return null;
    }

    public ArrayList<TaskResult> getTaskResults(String taskId, int startId){
        Task task = getTask(taskId);
        if (task == null) {
            return null;
        }
        ArrayList<TaskResult> results = new ArrayList<>();
        for (int i = startId; i < task.results.size(); i++) {
            results.add(task.results.get(i));
        }
        return results;
    }

    public boolean updateTaskResult(String taskId, TaskResult result){
        int resultId = result.id;
        for(Task task : taskList){
            if(task.id == taskId){
                task.updateResults(result);
                println("UpdateTask: "+task.describeMsg());
                println("TaskResult: "+result.type+" "+result.msg);
                return true;
            }
        }
        return false;
    }

    private void println(String msg){
        if(useLog){
            System.out.println(msg);
        }
    }

    private Task getTask(String taskId){
        for(Task task : taskList){
            if(task.id == taskId){
                return task;
            }
        }
        return null;
    }
}
