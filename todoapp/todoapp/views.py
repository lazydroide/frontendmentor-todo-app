import json

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db import transaction

from todos.models import Todo
from todos.utils import updatePositions


def index(request):
    return render(request, 'index.html', {
        'todos': Todo.objects.all().order_by('position')
    })


def insert(request):
    created = Todo.objects.create(task=request.GET.get('task'))

    if(created):
        return JsonResponse({'status': True, 'id': created.todo_id}, status='200') 

    return JsonResponse({'status': False}, status='404') 


def update(request, pk):
    todo = Todo.objects.filter(todo_id=pk).first()
    if todo:        
        todo.checked = not todo.checked
        todo.save()
        return JsonResponse({'status': True, 'checked': todo.checked}, status='200') 
    
    return JsonResponse({'status': False}, status='404') 


def positions(request):
    if request.method == 'POST':
        _positions = json.loads(request.body)
        
        if(updatePositions(_positions)):
            return JsonResponse({'status': True}, status='200') 
    
    return JsonResponse({'status': False}, status='404') 


def delete(request, pk):
    if request.method == 'POST':
        _positions = json.loads(request.body)
        print(_positions)
    _delete = Todo.objects.filter(todo_id=pk).delete()
    if _delete[0]:
        return JsonResponse({'status': True}, status='200') 
    else:
        # if something goes wrong render de index and send a message
        return JsonResponse({'status': False}, status='404') 


# [ ] implement messages
# [ ] minify, css and js https://django-compressor.readthedocs.io/en/latest/quickstart.html
