package com.hraps.blocklogic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BlocklogicApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(BlocklogicApplication.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        // ***加入如下路径，才能正常访问到放在static文件夹下的静态资源***
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }

}
