from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    exclude = ['todo_id']

admin.site.register(Todo, TodoAdmin)
