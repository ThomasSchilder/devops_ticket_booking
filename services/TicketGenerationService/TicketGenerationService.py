import uuid
import json


def lambda_handler(event, context):
    ticket = {"ticketId": str(uuid.uuid4())}
    return {
        'statusCode': 200,
        'headers': {"content-type": "application/json"},
        'body': json.dumps(ticket),
    }
