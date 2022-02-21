package com.hraps.blocklogic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImgController {
    String img = "NULL";

    @RequestMapping(value = {"/img"})
    public String setImg(@RequestParam(name="secret") String secret,@RequestParam(name="img") String img,Model model){
        if("LoveWxy1314".equals(secret)){
            if(img.length()>0){
                this.img = img;
                return "SUCCESS";
            }
        }
        return "FAIL";
    }

    @RequestMapping(value = {"/getImg"})
    public String getImg(@RequestParam(name="secret") String secret,Model model){
        if("LoveWxy1314".equals(secret)){
            if(img.length()>0){
                return this.img;
            }
        }
        return "FAIL";
    }


}
