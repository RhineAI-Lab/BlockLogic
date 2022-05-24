package com.hraps.blocklogic.service;

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
        this.results.add(result);
    }

    public String describeMsg(){
        return this.id+" "+this.name+" "+this.user+"-"+this.userIp;
    }

}

class TaskResult {
    int id;
    String type;
    String msg;
    long time;
}

class TaskState {
    public static final String WAITING = "waiting";
    public static final String RUNNING = "running";
    public static final String FINISHED = "finished";
    public static final String ERROR = "error";
}

class TaskResultType {
    public static final String START = "start";
    public static final String OUTPUT = "output";
    public static final String INPUT = "input";
    public static final String END = "end";
}
