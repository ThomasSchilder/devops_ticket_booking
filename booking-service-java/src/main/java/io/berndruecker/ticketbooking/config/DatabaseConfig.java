package io.berndruecker.ticketbooking.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfig {
    @Value("${ZEEBE_CLIENT_CLOUD_REGION}")
    private String zeebeClientCloudRegion;
    @Value("${ZEEBE_CLIENT_CLOUD_CLUSTERID}")
    private String zeebeClientCloudClusterId;
    @Value("${ZEEBE_CLIENT_CLOUD_CLIENTID}")
    private String zeebeClientCloudClientId;
    @Value("${ZEEBE_CLIENT_CLOUD_CLIENTSECRET}")
    private String zeebeClientCloudClientSecret;
    @Value("${SPRING_RABBITMG_ADRESSES}")
    private String springRabbitmgAdresses;
    @Value("${SPRING_RABBITMG_HOST}")
    private String springRabbitmgHost;
    @Value("${SPRING_RABBITMG_USERNAME}")
    private String springRabbitmgUsername;
    @Value("${SPRING_RABBITMG_PORT}")
    private String springRabbitmgPort;
    @Value("${SPRING_RABBITMG_PASSWORD}")
    private String springRabbitmgPassword;
    @Value("${SPRING_RABBITMG_VIRTUAL_HOST}")
    private String springRabbitmgVirtualHost;
    @Value("${SPRING_RABBITMG_SSL_ENABLED}")
    private String springRabbitmgSslEnabled;
    @Value("${API_URL}")
    private String apiUrl;

}
