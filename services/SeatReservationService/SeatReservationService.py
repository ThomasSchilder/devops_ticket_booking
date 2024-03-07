import json


def lambda_handler(event, context):
    body_str = event["body"]

    inner_data = json.loads(body_str)

    booking_reference_id = inner_data["bookingReferenceId"]
    if ("seat" != booking_reference_id):
        reservation = {"reservationId": "1234"}
        return {
            'statusCode': 200,
            'body': json.dumps(reservation)
        }
    return {
        'statusCode': 400,
        'body': json.dumps("ErrorSeatsNotAvailable")
    }
