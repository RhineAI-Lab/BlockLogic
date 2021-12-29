package com.hraps.blocklogic;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BlocklogicApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(BlocklogicApplication.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }

    //@Bean
    //public TomcatServletWebServerFactory tomcatServletWebServerFactory(){
    //    TomcatServletWebServerFactory tomcat =new TomcatServletWebServerFactory(){
    //        @Override
    //        protected void postProcessContext(Context context) {
    //            SecurityConstraint securityConstraint=new SecurityConstraint();
    //            securityConstraint.setUserConstraint("CONFIDENTIAL");
    //            SecurityCollection collection=new SecurityCollection();
    //            collection.addPattern("/*");
    //            securityConstraint.addCollection(collection);
    //            context.addConstraint(securityConstraint);
    //        }
    //    };
    //    tomcat.addAdditionalTomcatConnectors(httpConnector());
    //    return tomcat;
    //}

    //@Bean
    //public Connector httpConnector() {
    //    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
    //    connector.setScheme("http");
    //    connector.setPort(80);
    //    connector.setSecure(false);
    //    connector.setRedirectPort(443);
    //    return connector;
    //}

}
