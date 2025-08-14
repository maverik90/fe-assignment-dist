# tigerlab FE Engineer Assignment 
Author: Muzammil Mirza

This assignment is to be done as part of the recruitment process in tigerlab. You are tasked to build a simple react application that fulfills this requirement below.

## Requirements

Your application must meet the following requirements:

1. Include 2 pages
    - **Claim list**: Table format with the following fields
        - Claim id
        - Status
        - Claim amount
        - Holder name
        - Policy number
        - Insured item
        - Description
        - Incident date
        - Processing fee
        - Total amount (Claim amount + Processing fee)
        - Created at
    - **Create claim page**, which contains:
        - Policy number
        - Holder name
        - Insured item
        - Claim amount: string, 2 decimal point. e.g: "15.50"
        - Description
        - Incident date
        - Processing fee: string, 2 decimal point. e.g: "15.50"
2. Able to search by:
    - `claim id`; or
    - `holder name`; or
    - `policy number `
3. Able to filter by `status` (select). Statuses are:
    - `Submitted`
    - `Approved`
    - `Processed`
    - `Completed`
    - `Rejected`
4. Use any CSS framework
5. Use any framework or library. We recommend React.
6. Integrate with third party library. At least date picker


**For intermediate and senior candidate:**

7. Able to sort by
    - `newly created`
    - `latest created`
    - `smallest claim amount`
    - `largest claim amount`
    - `smallest processing fee`
    - `largest processing fee`
    - `smallest total amount`
    - `largest total amount`
8. Include validation for all fields is required.
9. Include validation for incident date to be more than 6 months and less than tomorrow
10. All code must come together with tests (preferably Jest, but others are okay too)

### Optional Requirements (Extra points)

11. Do API lookup for `policy number` field in the create claim form, and use the response to prefill the `holder name`
12. Use routing to navigate those pages
13. Display dialog modal to show welcome message based on query param called `admin=true`


ℹ️ Search, filter, and sort functionalities should be done in frontend. no pagination and API-based queries provided.

ℹ️ There are no aesthetic or design requirements. There are also no time limits, but we will not be able to schedule your interview until we receive your submission.

## Project Setup

> Node v16.x is required

To setup backend service, change directory to `mock/` and run `npm install`.

To start the server, tun `npm run mock`.

You can test the API response from the console, for example:
```
curl -X GET http://localhost:8001/api/v1/claims
```

Sample response:
```
[
  {
    "id": 1,
    "number": "CL-16219",
    "incidentDate": "2022-08-15",
    "createdAt": "2022-08-20",
    "amount": "464.00",
    "holder": "Lola Kiehn",
    "policyNumber": "TL-18592",
    "insuredItem": "Licensed Metal Shirt",
    "description": "Deserunt non vel tempora illo magni dicta tempora eos modi repellat cumque aut perferendis voluptatem.",
    "processingFee": "118.00",
    "status": "Submitted"
  },
]
```

## API Collection

This assignment comes with an exported Postman API collection `apis.postman_collection.json` which you can import.

> reference: https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman
