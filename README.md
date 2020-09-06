# MC

Application to create scaled models of the musculoskeletal system.

## Setup

The setup comprises of two parts, the server and the front end.

### Server

The server is a flask application server that can be run with gunicorn.
The application requires the `BACKEND_SQL_DATABASE` environment variable to be set.
The `BACKEND_SQL_DATABASE` points to the location on disk of the database that the server uses.
For example in GNU/Linux using a bash terminal use the following command to set this environment variable:

 export BACKEND_SQL_DATABASE=/home/me/databases/trc.db

For windows the equivalent command would be:

 set BACKEND_SQL_DATABASE=C:\Users\me\databases\trc.db

You will need to create the directory path to the database.
The application will create the database at that location on startup.
