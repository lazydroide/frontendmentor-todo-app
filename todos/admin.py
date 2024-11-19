from django.contrib import admin

from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ["todo_id", "position"]
    exclude = ['todo_id', 'position']

admin.site.register(Todo, TodoAdmin)
