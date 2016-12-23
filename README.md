# AudioTranscription Package

* Domain: https://www.scaleapi.com/audio-transcription
* Credentials: apiKey

## How to get credentials: 
0. Login to your [Scale API dashboard](https://dashboard.scaleapi.com/dashboard)
1. Copy and save your `TESTAPI KEY` or `LIVEAPI KEY` for production.

## AudioTranscription.createCategorizationTask
This endpoint creates a categorization task. In this task, one of our workers will view the attachment and choose a category for it according to the instruction. You may allow multiple categories to be chosen by setting allow_multiple to true. Example use cases are spam detection, copyright detection, product categorization, etc.

| Field          | Type       | Description
|----------------|------------|----------
| apiKey         | credentials| Scale Application Key.
| callbackUrl    | String     | The full url (including the scheme http:// or https://) of the callback when the task is completed.
| instruction    | String     | A markdown-enabled string explaining how to categorize the item. You can use markdown to show example images, give structure to your instructions, and more.
| attachmentType | String     | One of `text`, `image`, `video`, `audio`, `website`, or `pdf`. Describes what type of file the attachment is.
| attachment     | File       | The attachment to be categorized. If `attachmentType` is text, then it should be plaintext. Otherwise, it should be FILE a URL pointing to the attachment.
| categories     | JSON       | An array of strings for the categories which you’d like the object to be sorted between.
| urgency        | String     | Default is `day`. A string describing the urgency of the response. One of `immediate`, `day`, or `week`, where immediate is a one-hour response time.
| categoryIds    | JSON       | An optional dictionary where the keys are the optional ids, and the values are the category values provided in categories.
| allowMultiple  | Boolean    | Default is `false`. Determines whether you allow multiple categories to be chosen for the attachment
| metadata       | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.

#### `categoryIds` field example:
```json
"categoryIds": {
	"id1": "Option1",
	"id2": "Option2"
}
```
#### `categories` field example:
```json
"categories": ["Option1", "Option1"]
```
#### `metadata` field example:
```json
"metadata": {
	"key": "value"
}
```

## AudioTranscription.createTranscriptionTask
This endpoint creates a transcription task. In this task, one of our workers will read an attachment and arbitrarily transcribe any information you’d like. Example use cases could be transcribing information from PDFs, manually scraping a web page for information, etc.

| Field          | Type       | Description
|----------------|------------|----------
| apiKey         | credentials| Scale Application Key.
| callbackUrl    | String     | The full url (including the scheme `http://` or `https://`) of the callback when the task is completed.
| instruction    | String     | A markdown-enabled string explaining how to transcribe the attachment. You can use markdown to show example images, give structure to your instructions, and more.
| attachmentType | String     | One of `image` or `pdf`. Describes what type of file the attachment is.
| attachment     | File       | Should be a FILE or URL pointing to the attachment.
| fields         | JSON       | A dictionary corresponding to the fields to be transcribed. Keys are the keys you’d like the fields to be returned under, and values are descriptions to be shown to human workers.
| urgency        | String     | A string describing the urgency of the response. One of `immediate`, `day`, or `week`, where `immediate` is a one-hour response time.
| metadata       | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.

#### `fields` field example:
```json
"fields": ["Field1", "Field2"]
```
#### `metadata` field example:
```json
"metadata": {
	"key": "value"
}

## AudioTranscription.createPhoneCallTask
This endpoint creates a phonecall task. In this task, one of our workers will call the specified phone number and follow the instructions. Potential use cases could be making reservations or appointments, confirming reservations, asking for contact numbers or emails, etc.

| Field          | Type       | Description
|----------------|------------|----------
| apiKey         | credentials| Scale Application Key.
| callbackUrl    | String     | The full url (including the scheme `http://` or `https://`) of the callback when the task is completed.
| instruction    | String     | A markdown-enabled string explaining how to complete the phone call. You can use markdown to show example images, give structure to your instructions, and more.
| phoneNumber    | String     | The phone number which will be called by our worker. Should include a country code (+1 for US numbers).
| script         | String     | A script to be shown the the worker as they make the phone call. Your script will greatly impact the quality of the results you receive.
| entityName     | String     | The name of the entity which corresponds to the person or business of the phone number.
| urgency        | String     | A string describing the urgency of the response. One of `immediate`, `day`, or `week`, where `immediate` is a one-hour response time.
| attachmentType | String     | One of `text`, `image`, `video`, `audio`, `website`, or `pdf`. Describes what type of file the attachment is.
| attachment     | File       | The optional attachment to be used for the phone call. If `attachmentType` is text, then it should be plaintext. Otherwise, it should be a FILE or URL pointing to the attachment.
| fields         | JSON       | A dictionary corresponding to the fields to be recorded. Keys are the keys you’d like the fields to be returned under, and values are descriptions to be shown to human workers.
| choices        | JSON       | An array of strings for the choices to be given to the worker. They will choose one of these in accordance with your instruction.
| metadata       | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.

#### `fields` field example:
```json
"fields": ["Field1", "Field2"]
```
#### `metadata` field example:
```json
"metadata": {
	"key": "value"
}

## AudioTranscription.createComparisonTask
This endpoint creates a comparison task. In this task, one of our workers view the given attachments and do any comparison requested.

| Field          | Type       | Description
|----------------|------------|----------
| apiKey         | credentials| Scale Application Key.
| callbackUrl    | String     | The full url (including the scheme `http://` or `https://`) of the callback when the task is completed.
| instruction    | String     | A markdown-enabled string explaining how to compare the attachments. You can use markdown to show example images, give structure to your instructions, and more.
| attachmentType | String     | One of `text`, `image`, `video`, `audio`, `website`, or `pdf`. Describes what type of file the attachment is.
| attachments    | JSON       | An array of attachments to compare. If attachment_type is text, then each attachment should be plaintext. Otherwise, they should be URLs pointing to the attachments.
| urgency        | String     | A string describing the urgency of the response. One of `immediate`, `day`, or `week`, where `immediate` is a one hour response time.
| fields         | String     | A dictionary corresponding to the fields to be recorded. Keys are the keys you’d like the fields to be returned under, and values are descriptions to be shown to human workers.
| choices        | JSON       | An array of strings for the choices to be given to the worker. One of choices or fields must be specified.
| metadata       | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.

#### `choices` field example:
```json
"choices": ["Yes", "No"]
```
#### `attachments` field example:
```json
"attachments": [
  "http://i.ebayimg.com/00/$T2eC16dHJGwFFZKjy5ZjBRfNyMC4Ig~~_32.JPG",
  "http://images.wisegeek.com/checkered-tablecloth.jpg"
]
```
#### `metadata` field example:
```json
"metadata": {
	"key": "value"
}

## AudioTranscription.createAnnotationTask
This endpoint creates a annotation task. In this task, one of our Scalers view the given image and draw bounding boxes around the specified objects, returning the positions and sizes of these boxes.

| Field                | Type       | Description
|----------------------|------------|----------
| apiKey               | credentials| Scale Application Key.
| callbackUrl          | String     | The full url (including the scheme `http://` or `https://`) of the callback when the task is completed.
| objectsToAnnotate    | JSON       | An array of strings describing which objects you’d like bounding boxes to be drawn around. Each string should be singular and self-descriptive (ex: “cat”, “street sign”, “potato”). You may include at most 6 objects.
| attachment           | File       | A Image file or URL to the image you’d like to be annotated with bounding boxes.
| withLabels           | Boolean    | Specifies whether you’d like labels for each bounding box in the response. Each label will be a member of the `objectsToAnnotate` array.
| examples             | JSON       | A list of examples. Each example requires a correct boolean indicating whether it is a correct or incorrect example and an image URL to the example image. Optionally, provide an explanation for the example explaining why it is correct or incorrect.
| urgency              | String     | A string describing the urgency of the response. One of immediate, day, or week, where immediate is a one-hour response time.
| instruction          | String     | A markdown-enabled string explaining how to draw the bounding boxes. You can use markdown to show example images, give structure to your instructions, and more.
| metadata             | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.


#### `objectsToAnnotate` field example:
```json
"objectsToAnnotate": ["This is first object to annotate", "This is second object to annotate"]
```
#### `examples` field example:
```json
"examples": [{
	"correct": true,
	"image": "http://www.rapidapi.com/example-img1.jpg",
	"explanation": "This is explanation for the first object"
}, {
	"correct": true,
	"image": "http://www.rapidapi.com/example-img2.jpg",
	"explanation": "This is explanation for the second object"
}]
```
#### `metadata` field example:
```json
"metadata": {
	"key": "value"N
This endpoint creates a datacollection task. In this task, one of our workers will try to find some information through the internet, following the instructions that you provide. Example use cases could be finding the product page of a particular product on Amazon, or trying to find the email of a particular person given their name and position.

| Field          | Type       | Description
|----------------|------------|----------
| apiKey         | credentials| Scale Application Key.
| callbackUrl    | String     | The full url (including the scheme `http://` or `https://`) of the callback when the task is completed.
| instruction    | String     | A markdown-enabled string explaining how to draw the bounding boxes. You can use markdown to show example images, give structure to your instructions, and more.
| attachmentType | String     | One of `text`, `image`, `website`. Describes what type of file the attachment is.
| attachment     | File       | The optional attachment to be used for the phone call. If `attachmentType` is text, then it should be plaintext. Otherwise, it should be a FILE or URL pointing to the attachment.
| fields         | JSON       | A dictionary corresponding to the fields of information to be collected. Keys are the keys you’d like the fields to be returned under, and values are descriptions to be shown to human workers.
| urgency        | String     | A string describing the urgency of the response. One of `immediate`, `day`, or `week`, where immediate is a one-hour response time. Default is `day`.
| metadata       | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.

#### `fields` field example:
```json
"fields": ["Field1", "Field2"]
```
#### `metadata` field example:
```json
"metadata": {
	"key": "value"
}

## AudioTranscription.createAudioTranscriptionTask
This endpoint creates an audiotranscription task. In this task, we will transcribe the speech from the audio file you specify into plaintext.

| Field          | Type       | Description
|----------------|------------|----------
| apiKey         | credentials| Scale Application Key.
| callbackUrl    | String     | The full url (including the scheme `http://` or `https://`) of the callback when the task is completed.
| instruction    | String     | A markdown-enabled string explaining how to draw the bounding boxes. You can use markdown to show example images, give structure to your instructions, and more.
| attachment     | File       | An audio file or URL pointing to the audio file attachment.
| verbatim       | Boolean    | Specifies whether or not to include non-words (ex: “um”, “hm”) in the transcript. Default is false.
| urgency        | String     | A string describing the urgency of the response. One of `immediate`, `day`, or `week`, where `immediate` is a one-hour response time.
| metadata       | JSON       | A set of key/value pairs that you can attach to a task object. It can be useful for storing additional information about the task in a structured format.

#### `metadata` field example:
```json
"metadata": {
	"key": "value"
}

## AudioTranscription.getSingleTask
This endpoint retrieves a specific task.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Scale Application Key.
| taskId    | String     | The id of the task to retrieve

## AudioTranscription.cancelTask
This endpoint cancels a task so that it will not be completed. You may only cancel pending tasks, and the endpoint will return a 500 error code if you attempt to cancel a completed task.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Scale Application Key.
| taskId    | String     | The id of the task to cancel

## AudioTranscription.getTasks
This is a paged endpoint retrieves a list of your tasks. The tasks will be returned in descending order based on `createdAt` time. The pagination is based on the `limit` and offset `parameters`, which determine the page size and how many results to skip.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Scale Application Key.
| startTime | String     | ISO 8601 Date. The minimum value of `createdAt` for tasks to be returned.
| endTime   | String     | ISO 8601 Date. The maximum value of `createdAt` for tasks to be returned.
| status    | String     | The status of the task - can be: `completed`, `pending`, or `canceled`.
| type      | String     | The type of the task - can be: `transcription`, `categorization`, `phonecall`, `comparison`, `annotation`, `datacollection`, or any other task type. 
| limit     | Number     | A number between 1 and 100, the maximum number of results to display per page.
| offset    | Number     | The number of results to skip, for showing the next page.

