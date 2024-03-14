package com.sysintelli.appointmentScheduler.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
@Configuration
public class SQSConfig {
	 @Value("${aws.accessKeyId}")
	    private String accessKeyId;

	    @Value("${aws.secretKey}")
	    private String secretKey;

	    @Value("${aws.region}")
	    private String region;

	    @Value("${aws.sqs.queueName}")
	    private String queueName;
	    @Bean
	    public AmazonSQS amazonSQS() {
	        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretKey);
	        return AmazonSQSClientBuilder.standard()
	                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
	                .withRegion(region)
	                .build();
	    }
	    @Bean
	    public String createQueue(AmazonSQS amazonSQS) {
	        String queueUrl = amazonSQS.createQueue(queueName).getQueueUrl();
	        System.out.println("SQS queue created with URL: " + queueUrl);
	        return queueUrl;
	    }
}
