package com.hraps.blocklogic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @RequestMapping(value = {"","/index"})
    public String index(Model model){
        return "index";
    }
    @RequestMapping(value = {"","/workspace"})
    public String workspace(Model model){
        return "workspace";
    }
    @RequestMapping(value = {"","/docs"})
    public String docs(Model model){
        return "docs";
    }
}
