import json
from .models import Todo

def updatePositions(request, id=None):
    _positions = json.loads(request.body)
    if id:
        _positions = {key: value for key, value in _positions.items() if value != id}
    
    if not _positions: return True

    _todos = [Todo(todo_id=_id, position=float(_position)) for _position, _id in _positions.items()]
    return Todo.objects.bulk_update(_todos, ['position'])