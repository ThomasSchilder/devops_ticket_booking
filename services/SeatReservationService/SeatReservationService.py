import json


def lambda_handler(event, context):
    booking_reference_id = event["bookingReferenceId"]
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

