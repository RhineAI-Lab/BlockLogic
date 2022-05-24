package com.hraps.blocklogic.service;

import com.google.gson.JsonArray;
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

    public Task getWaitedTask(String runnerId, String runnerMsg) {
        // Test task
        if (taskList.size() == 0) {
            Task task = new Task("test", "temp.py", "Server", "127.0.0.1", "print('Hello World')\n");
            taskList.add(task);
        }

        for (Task task : taskList) {
            if (task.state.equals(TaskState.WAITING)) {
                task.startRun(runnerId, runnerMsg);
                println("RunTask: "+task.describeMsg());
                return task;
            }
        }
        return null;
    }

    public JsonArray getTaskResults(String taskId, int startId){
        Task task = getTask(taskId);
        if (task == null) {
            return null;
        }
        JsonArray results = new JsonArray();
        for (int i = startId; i < task.results.size(); i++) {
            results.add(task.results.get(i).toJsonObject());
        }
        return results;
    }

    public int updateTaskResult(String taskId, String runnerId, int id, String type, String msg, long time) {
        for(Task task : taskList){
            if(task.id.equals(taskId)){
                if(!runnerId.equals(task.runnerId)){
                    return -1;
                }
                task.updateResults(new Task.TaskResult(id, type, msg, time));
                println("UpdateTask: "+task.describeMsg());
                println("TaskResult: "+type+"-"+msg);
                return 0;
            }
        }
        return -2;
    }

    private void println(String msg){
        if(useLog){
            System.out.println(msg);
        }
    }

    public Task getTask(String taskId){
        for(Task task : taskList){
            if(task.id.equals(taskId)){
                return task;
            }
        }
        return null;
    }
}
