package com.hraps.blocklogic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
    @RequestMapping(value = {"","/index"})
    public String index(Model model){
        return "index";
    }
    @RequestMapping(value = {"/workspace"})
    public String workspace(@RequestParam(name="source",defaultValue = "") String source, Model model){
        if(source.length()>0){
            model.addAttribute("source",source);
        }
        return "workspace";
    }
    @RequestMapping(value = {"/space"})
    public String space(@RequestParam(name="source",defaultValue = "") String source, Model model){
        if(source.length()>0){
            model.addAttribute("source",source);
        }
        return "space";
    }
    @RequestMapping(value = {"/docs"})
    public String docs(Model model){
        return "docs";
    }
    @RequestMapping(value = {"/uieditor"})
    public String uieditor(Model model){
        return "uieditor";
    }
    @RequestMapping(value = {"/examples"})
    public String examples(Model model){
        return "examples";
    }
}
