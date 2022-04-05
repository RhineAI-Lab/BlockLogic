package com.hraps.blocklogic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
    @RequestMapping(value = {"","/index"})
    public String index(Model model){
        return "home/index";
    }
    @RequestMapping(value = {"/last-space"})
    public String lastSpace(@RequestParam(name="source",defaultValue = "") String source, Model model){
        if(source.length()>0){
            model.addAttribute("source",source);
        }
        return "app/space";
    }
    @RequestMapping(value = {"/docs"})
    public String docs(Model model){
        return "docs/docs";
    }
    @RequestMapping(value = {"/examples"})
    public String examples(Model model){
        return "home/examples";
    }
}
