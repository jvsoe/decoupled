from datetime import datetime

from django.http import HttpResponseServerError
from django.shortcuts import render, get_object_or_404


# Create your views here.
from typing import List
from ninja import NinjaAPI, Schema
from ninja.security import django_auth
from .models import Entry

from ninja.orm import create_schema


# ninja_api = NinjaAPI(auth=django_auth, csrf=True)
ninja_api = NinjaAPI()

EntryIn = create_schema(Entry,
    fields=['text', 'number']
)

EntryOut = create_schema(Entry,
    # fields=['id', 'text', 'number', 'created_at'],
    # depth=0
)


@ninja_api.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}


@ninja_api.get("/entries", response=List[EntryOut])
def list_employees(request):
    qs = Entry.objects.all()
    return qs


@ninja_api.post("/entries", response=EntryOut)
def entry(request, payload: EntryIn):
    obj = Entry.objects.create(**payload.dict())
    return obj


@ninja_api.put("/entries/{entry_id}", response=EntryOut)
def entry(request, entry_id: int, payload: EntryIn):
    Entry.objects.filter(id=entry_id).update(**payload.dict())
    entry = Entry.objects.get(id=entry_id)
    return entry


@ninja_api.api_operation(['GET', 'DELETE'], "/entries/{entry_id}", response=EntryOut)
def entry(request, entry_id: int):
    entry = get_object_or_404(Entry, id=entry_id)
    match request.method:
        case 'GET':
            return entry
        case 'DELETE':
            entry.delete()
            return entry

