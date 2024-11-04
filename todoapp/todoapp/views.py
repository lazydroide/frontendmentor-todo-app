from django.shortcuts import render, redirect

from todos.models import Todo


def index(request):
    if request.method == 'POST' and request.POST['todo']:
        Todo.objects.create(task=request.POST['todo'])
        return redirect('index')
    return render(request, 'index.html', {
        'todos': Todo.objects.all()
    })

def update(request, pk):
    todo = Todo.objects.filter(todo_id=pk).first()
    todo.checked = not todo.checked
    todo.save()
    return redirect('index')


def delete(request, pk):
    print(pk)
    Todo.objects.filter(todo_id=pk).delete()
    return redirect('index')