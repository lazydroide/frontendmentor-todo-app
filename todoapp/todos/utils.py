from .models import Todo

def updatePositions(_positions):
    _todos = [Todo(todo_id=_id, position=float(_position)) for _position, _id in _positions.items()]
    return Todo.objects.bulk_update(_todos, ['position'])