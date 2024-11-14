from django.shortcuts import render, redirect
from django.http import JsonResponse

from todos.models import Todo


def index(request):
    return render(request, 'index.html', {
        'todos': Todo.objects.all(),
        'left': '0 items left'
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


def delete(request, pk):
    _delete = Todo.objects.filter(todo_id=pk).delete()
    if _delete[0]:
        return JsonResponse({'status': True}, status='200') 
    else:
        return JsonResponse({'status': False}, status='404') 


# [ ] implement messages