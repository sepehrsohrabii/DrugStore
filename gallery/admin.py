from django.contrib import admin
from .models import Book, Comment, Category, Star

# Register your models here.

class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created', 'author', 'price')
    list_filter = ('price', 'created')
    search_fields = ('name', 'slug', 'description', 'number_of_pages')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['-created', 'price']

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'created_date')
    list_filter = ('book', 'created_date')
    search_fields = ('content',)
    ordering = ['-created_date']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    search_fields = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}

class StarAdmin(admin.ModelAdmin):
    list_display = ('score', 'user', 'book')
    ordering = ['score']

admin.site.register(Book, BookAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Star, StarAdmin)