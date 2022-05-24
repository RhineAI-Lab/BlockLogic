package com.hraps.blocklogic.service;

import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Task {
    String id;
    String name;
    String user;
    String userIp;

    String code;
    String state = TaskState.WAITING;

    String runnerId = ""; // 一般使用ip
    String runnerMsg = "";
    long startTime = -1;
    long endTime = -1;

    ArrayList<TaskResult> results = new ArrayList<>();

    public Task(String id, String name, String user, String userIp, String code) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.userIp = userIp;
        this.code = code;
    }

    public void startRun(String runnerId, String runnerMsg){
        this.runnerId = runnerId;
        this.runnerMsg = runnerMsg;
        this.startTime = System.currentTimeMillis();
        this.state = TaskState.RUNNING;
    }

    public void updateResults(TaskResult result){
        while(results.size() - 1 < result.id){
            results.add(new TaskResult(results.size(), TaskResultType.UNKNOWN, "", -1));
        }
        if(result.type == TaskResultType.START) {
            this.startTime = result.time;
        }
        if(result.type == TaskResultType.END) {
            this.endTime = result.time;
            this.state = TaskState.FINISHED;
        }
        results.set(result.id, result);
    }
    
    public JsonObject toJsonObject(){
        JsonObject json = new JsonObject();
        json.addProperty("id", id);
        json.addProperty("name", name);
        json.addProperty("user", user);
        json.addProperty("userIp", userIp);
        json.addProperty("code", code);
        json.addProperty("state", state);
        return json;
    }

    public String describeMsg(){
        return this.id+" "+this.name+" "+this.user+"-"+this.userIp;
    }

    static class TaskResult {
        int id;
        String type;
        String msg;
        long time;

        public TaskResult(int id, String type, String msg, long time) {
            this.id = id;
            this.type = type;
            this.msg = msg;
            this.time = time;
        }

        public JsonObject toJsonObject(){
            JsonObject json = new JsonObject();
            json.addProperty("id", id);
            json.addProperty("type", type);
            json.addProperty("msg", msg);
            json.addProperty("time", time);
            return json;
        }
    }

}

class TaskState {
    public static final String WAITING = "waiting";
    public static final String RUNNING = "running";
    public static final String FINISHED = "finished";
    public static final String ERROR = "error";
}

class TaskResultType {
    public static final String UNKNOWN = "unknown";
    public static final String START = "start";
    public static final String OUTPUT = "output";
    public static final String INPUT = "input";
    public static final String END = "end";
}
