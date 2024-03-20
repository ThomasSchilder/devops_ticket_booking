package io.berndruecker.ticketbooking.adapter;

import io.berndruecker.ticketbooking.ProcessConstants;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import io.berndruecker.ticketbooking.config.DatabaseConfig;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import io.berndruecker.ticketbooking.config.DatabaseConfig;

@Component
public class GenerateTicketAdapter {

  Logger logger = LoggerFactory.getLogger(GenerateTicketAdapter.class);

  // This should be of course injected and depends on the environment.
  @Value("${api.endpoint.uri}")
  public String ENDPOINT;

  @Autowired
  private RestTemplate restTemplate;

  @JobWorker(type = "generate-ticket")
  public Map<String, Object> callGenerateTicketRestService(final ActivatedJob job) throws IOException {
    logger.info("Generate ticket via REST [" + job + "]");

    logger.info("REST API address: " + ENDPOINT );

    if ("ticket".equalsIgnoreCase((String)job.getVariablesAsMap().get(ProcessConstants.VAR_SIMULATE_BOOKING_FAILURE))) {

      // Simulate a network problem to the HTTP server
      throw new IOException("[Simulated] Could not connect to HTTP server");

    } else {

      // Call REST API, simply returns a ticketId
      CreateTicketResponse ticket = restTemplate.getForObject(ENDPOINT, CreateTicketResponse.class);
      logger.info("Succeeded with " + ticket);

      return Collections.singletonMap(ProcessConstants.VAR_TICKET_ID, ticket.ticketId);
    }
  }

  public static class CreateTicketResponse {
    public String ticketId;
  }
}
