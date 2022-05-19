package com.hraps.blocklogic.service;

import java.util.ArrayList;

public class Task {
    int id;
    String name;
    String user;
    String userIp;

    String code;
    String state;

    long startTime;
    long endTime;

    ArrayList<TaskResult> results;
}

class TaskResult {
    long time;
    String msg;
}

class TaskState {
    public static final String LOADING = "loading";
    public static final String WAITING = "waiting";
    public static final String RUNNING = "running";
    public static final String FINISHED = "finished";
    public static final String ERROR = "error";
}
