package com.hraps.blocklogic.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.hraps.blocklogic.service.Task;
import com.hraps.blocklogic.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class PyRunnerController {
    @Autowired
    private TaskService taskService;

    @RequestMapping(value = {"/api/runner/add"})
    public String addTask(
            HttpServletRequest request,
            @RequestParam(name="user", defaultValue = "TEMP") String user,
            @RequestParam(name="code") String code,
            @RequestParam(name="file", defaultValue = "temp.txt") String name
    ) {
        taskService.addTask(request.getRemoteAddr(), user, code, name);
        return makeResultJson();
    }

    @RequestMapping(value = {"/api/runner/get"})
    public String getTask(
            HttpServletRequest request,
            @RequestParam(name="msg", defaultValue = "") String msg
    ) {
        Task task = taskService.getWaitedTask(request.getRemoteAddr(), msg);
        if (task == null) {
            return makeResultJson(201, "No waited task");
        }
        return makeResultJson(task.toJsonObject());
    }

    @RequestMapping(value = {"/api/runner/result/add"})
    public String addTaskResult(
            HttpServletRequest request,
            @RequestParam(name="task") String taskId,
            @RequestParam(name="id") String id,
            @RequestParam(name="type") String type,
            @RequestParam(name="msg") String msg,
            @RequestParam(name="time") String time
    ) {
        int result = taskService.updateTaskResult(taskId, request.getRemoteAddr(), Integer.parseInt(id), type, msg, Long.parseLong(time));
        if(result==0){
            return makeResultJson();
        }else if(result==-1) {
            return makeResultJson(602, "RunnerId not match");
        }else if(result==-2) {
            return makeResultJson(601, "Task not found");
        }else {
            return makeResultJson(600, "Unknown error");
        }
    }

    @RequestMapping(value = {"/api/runner/result/get"})
    public String getTaskResult(
            HttpServletRequest request,
            @RequestParam(name="task") String taskId,
            @RequestParam(name="start") String startId
    ) {
        JsonArray results = taskService.getTaskResults(taskId, Integer.parseInt(startId));
        if (results == null) {
            return makeResultJson(601, "Task not found");
        }
        if (results.size() == 0) {
            return makeResultJson(202, "No new results");
        }
        return makeResultJson(results);
    }

    public String makeResultJson(JsonElement value){
        return makeResultJson(200, "SUCCESS", value);
    }
    public String makeResultJson(){
        return makeResultJson(new JsonObject());
    }
    public String makeResultJson(int result, String msg){
        return makeResultJson(result, msg, new JsonObject());
    }
    public String makeResultJson(int result, String msg, JsonElement value){
        JsonObject json = new JsonObject();
        json.addProperty("result", result);
        json.addProperty("msg", msg);
        json.add("value", value);
        return json.toString();
    }

}
