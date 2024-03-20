import json
import uuid

def lambda_handler(event, context):
    if ("simulateBookingFailure" in event and event["simulateBookingFailure"] == "seats"):
        raise Exception("ErrorSeatsNotAvailable")

    reservation = str(uuid.uuid4())
    return {
        'statusCode': 200,
        "headers": {
            "content-type": "application/json"
        },
        'body': json.dumps(reservation)
    }
