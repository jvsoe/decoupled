# Example app

This is an example web application.


The backend is built in Django, the frontend in React.


The frontend is served directly through Django as a compiled React project

## Demo

The app is hosted at https://django-hjemmeside.herokuapp.com/

## Entries

The app contains a table of all entries in the database.



An Entry is a Django model with arbitrary fields like `text` and `number`. 


## API

A public CRUD API exists to alter the table content.
The API is built with [Django Ninja](https://github.com/vitalik/django-ninja) which is based on [Pydantic](https://github.com/samuelcolvin/pydantic) for automatic type checking and parsing.

API docs are automatically generated and can be viewed and interacted with through a nav-bar link

## Limitation

The system will automatically start deleting DB rows after reaching 50 entries 
