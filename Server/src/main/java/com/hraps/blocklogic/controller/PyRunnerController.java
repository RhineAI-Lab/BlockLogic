package com.hraps.blocklogic.controller;

import com.hraps.blocklogic.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
public class PyRunnerController {
    @Autowired
    private TaskService taskService;

    @RequestMapping(value = {"/api/runner/add"})
    public String AddTask(
            HttpServletRequest request,
            @RequestParam(name="user",defaultValue = "TEMP-0") String user,
            @RequestParam(name="code") String code,
            @RequestParam(name="file",defaultValue = "temp.txt") String name
    ) {
        taskService.addTask(request.getRemoteAddr(), user, code, name);
        return "";
    }

    @RequestMapping(value = {"/api/runner/get"})
    public String GetTask() {
        return "";
    }

    @RequestMapping(value = {"/api/runner/result/add"})
    public String AddTaskResult() {
        return "";
    }

    @RequestMapping(value = {"/api/runner/result/get"})
    public String GetTaskResult() {
        return "";
    }
}
