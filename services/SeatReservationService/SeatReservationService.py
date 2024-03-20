import json

def lambda_handler(event, context):
    # Throw 'ErrorSeatsNotAvailable' whenever a booking failure is simulated.
    if (event['simulateBookingFailure'] == 'seats'):
        raise Exception("ErrorSeatsNotAvailable")

    booking_reference_id = event["bookingReferenceId"]
    reservation = str(uuid.uuid4())
    return {
        'statusCode': 200,
        "headers": {
            "content-type": "application/json"
        },
        'body': json.dumps(reservation)
    }