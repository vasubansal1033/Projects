package com.kafka.springboot.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic vasuTopic(){
        return TopicBuilder.name("vasu").build();
    }
    @Bean
    public NewTopic vasuJsonTopic(){
        return TopicBuilder.name("vasu_json").build();
    }

}
