from datetime import datetime

from django.http import HttpResponseServerError
from django.shortcuts import render, get_object_or_404


# Create your views here.
from typing import List, Dict
from ninja import NinjaAPI, Schema
from ninja.security import django_auth

from users.models import User
from .models import Entry

from ninja.orm import create_schema


# ninja_api = NinjaAPI(auth=django_auth, csrf=True)
ninja_api = NinjaAPI(title="Entry API")

EntryIn = create_schema(Entry,
    name='EntryIn',
    fields=['text', 'number']
)


EntryOut = create_schema(Entry,
    name='EntryOut'
)


class Entries(Schema):
    # name: 'Entries'
    entries: List[EntryOut]
    fields_to_names: List[Dict] # Dict


UserOut = create_schema(
    User,
    name='UserOut',
    fields=['first_name', 'entries'],
    depth=1
)


@ninja_api.get("/entry_table_def")
def entry_schema(request):
    model = EntryOut.schema()
    fields_to_names = {field: meta['title'] for field, meta in model['properties'].items()}
    return fields_to_names

@ninja_api.get("/entries", response=Entries)
def entries(request):
    model = EntryOut.schema()
    # fields_to_names = {field: meta['title'] for field, meta in model['properties'].items()}
    columns = []
    for field, meta in model['properties'].items():
        columns.append({'Header': meta['title'], 'accessor': field})
    entries = Entries(
        entries=list(Entry.objects.order_by('-id')),
        # fields_to_names=fields_to_names
        fields_to_names=columns
    )
    return entries

@ninja_api.get("/users", response=List[UserOut])
def users(request):
    qs = User.objects.all()
    return qs


@ninja_api.post("/entries", response=EntryOut)
def entry(request, payload: EntryIn):
    # Creation
    obj = Entry.objects.create(**payload.dict())
    # Deletion
    last_50_ids = Entry.objects.order_by('-created_at')[:50].values_list('id')
    print(Entry.objects.exclude(pk__in=last_50_ids).delete())
    return obj


@ninja_api.put("/entries/{entry_id}", response=EntryOut)
def entry(request, entry_id: int, payload: EntryIn):
    Entry.objects.filter(id=entry_id).update(**payload.dict())
    entry = Entry.objects.get(id=entry_id)
    return entry


@ninja_api.api_operation(['GET', 'DELETE'], "/entries/{entry_id}", response=EntryOut)
def entry(request, entry_id: int):
    entry = get_object_or_404(Entry, id=entry_id)
    # match request.method:
    #     case 'GET':
    #         return entry
    #     case 'DELETE':
    #         entry.delete()
    #         return entry
    if request.method == 'GET':
        return entry
    elif request.method == 'DELETE':
        entry.delete()
        return entry
