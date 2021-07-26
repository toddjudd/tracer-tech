T482.io endpoints
GET /login/oauth/authorize
client_id exists in database
then -> redirect /login including params
else -> redirect /login or 404 depending on logged in status

GET /login
client_id exists in params
then -> call db to get client_id details
check redirect_uri against client_id in db
show /login form
include responsive client_id portion
const onLogin = () => {
//since this is the standard login page if the params are set then go get a code..
if params
then -> retreive code from POST /login/oauth/authorize/code
redirect to default redirect_uri or given redirect_uri
include state param
include code param
//there is only one redirect_uri for GitHub
}

POST /login/oauth/authorize/code
validate oauth token using firebase auth
generate code and expiration date
return code

GET /oauth/client?client_id=<client_id>
validate authorization via header
validate user permission via db
.. this can't be a super user as that would expose the API and the user won't be logged in
theoretically you could hit GH with every client id and get the minimum data so this shoudld be fine. it just can only return non sensitive data such as name and id but not secret or redirect_uri? or other stuff.

POST /login/oauth/access_token
client_id exists in database
else -> 404
client_secret matches client_id
//errors are in text url encoded prop=val&prop=val
error -> clentid and/or secret are broken
redirect_uri matches client_id
error -> redirect_uri_mismatch
code exists and is current
error -> code is incorrect or expired
get user token from db
if header Accept: application/json
respond with {"access_token": 'token', "token_type": 'bearer'}
if header Accept: application/xml
respond with
<OAuth>4869428
<token_type>bearer</token_type>
<access_token>gho_16C7e42F292c6912E7710c838347Ae178B4a</access_token>
</OAuth>
else
respond with access_token=<>&token_type=bearer
486942848694284869428
4869e428
// error example
//error%3Dbad_verification_code%26error_description%3DThe%20code%20passed%20is%20incorrect%20or%20expired.%26error_uri%3Dhttps%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-oauth-app-access-token-request-errors%2F%23bad-verification-code
//error
//error_description
//error_uri

for all other calls the oauth token is expected in the authorization header as
`token OAUTH-TOKEN`
