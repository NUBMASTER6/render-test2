from django.contrib import admin
from .models import Catalog, Item

# Register the Catalog model with the admin panel
@admin.register(Catalog)
class CatalogAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # Display these fields in the admin list view

# Register the Item model with the admin panel
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'catalog', 'gender', 'breed', 'age', 'birthday', 'color', 'eyes', 'location', 'likes', 'comments', 'shares', 'date_added')
    search_fields = ('title', 'breed', 'location')  # Allows search by these fields
    list_filter = ('catalog', 'gender', 'breed', 'color')  # Add filters in the admin sidebar