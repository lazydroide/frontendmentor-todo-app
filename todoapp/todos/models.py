import uuid

from django.db import models
from django.db.models.signals import pre_save


class Todo(models.Model):
    todo_id = models.CharField(max_length=100, null=False, blank=False, unique=True)
    task = models.CharField(max_length=200, blank=False, null=False)
    checked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.todo_id
    




def set_todo_id(sender, instance, *args, **kwargs):
    if not instance.todo_id:
        _todo_id= str(uuid.uuid4())
        while Todo.objects.filter(todo_id=_todo_id):
            _todo_id = str(uuid.uuid4())
        instance.todo_id = _todo_id

pre_save.connect(set_todo_id, sender=Todo)