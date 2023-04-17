#CHAT APP PROJECT FOR FSOC

Authentication using otp/password/hash, with capability of creating group, sharing documents or photos (viewing and downloading), sharing public status/moments.
ExpressJs and mysql/mongoDB


The following routes are available in the backend API:

User:

Register User
POST /api/user
Registers a new user. Required fields: username,phone, email, password and pic.

Login User
POST /api/user/login
Logs in a user. Required fields: username, password.

Login using OTP Verification:

Generate OTP
POST /api/user/sendOTP
Generates a One-Time Password (OTP) and sends it to the user's registered mobile number. Required field: phone.

Verify OTP
POST /api/user/verifyOTP
Verifies the OTP sent to the user's registered mobile number. Required fields: phone, otp.

Get All Users
GET /api/users
Fetches all registered users. Requires authentication.

Chat
Create Chat
POST /api/chat
Creates a new chat. Required fields: participants ids.

Get Chats
GET /api/chat
Fetches all chats that the authenticated user is a part of.

Create Group
POST /api/chat/group
Creates a new group chat. Required fields: name, participants.

Rename Group
PUT /api/chat/rename
Renames an existing group chat. Required fields: groupId, name.

Add Users to Group
PUT /api/chat/add-group
Adds one or more users to an existing group chat. Required fields: groupId, users.

Remove Users from Group
PUT /api/chat/remove-group
Removes one or more users from an existing group chat. Required fields: groupId, users.

Message:

Send Message
POST /api/message
Sends a message in an existing chat. Required fields: chatId, message.

Get All Messages
GET /api/message/:chatId
Fetches all messages in an existing chat. Requires authentication.

Error Handling
For any invalid routes, the server returns a 400 status code with the message "Invalid URL".

For any errors with the above routes, the server returns a relevant error message and status code 500.