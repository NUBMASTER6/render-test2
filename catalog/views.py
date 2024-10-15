from django.shortcuts import render, get_object_or_404
from .models import Catalog, Item

def catalog(request):
    # Load banners
    banners = [
        {'text': 'Промо-баннер для анонса фич или еще чего угодно', 'icon': '􀌟'},
        {'text': 'Another promo banner text here', 'icon': '􀌟'},
        # Add more banners here as needed
    ]
    specialists = [
        {
            'icon': '􀰑',
            'name': 'Доктор Иванов',
            'price': 25000,
            'gender': 'Мужчина',
            'specialty': 'Ветеринар',
            'experience': 15,
            'birthday': '05.05.24',
            'zodiac': 'Телец',
            'color': 'Белый окрас',
            'eyes': 'Голубые глаза',
            'location': 'Москва',
            'date': '24 апреля, 20:43'
        },
        # Add more specialists here
    ]
    pets = [
        {
            'name': 'Пример названия объявления',
            'price': '25 000',
            'icon': '􀌟',
            'gender': 'Девочка',
            'breed': 'Пудель',
            'age': 'До 1 года',
            'birthday': '05.05.24',
            'zodiac': 'Телец',
            'color': 'Белый окрас',
            'eyes': 'Голубые глаза',
            'location': 'Москва',
            'date': '24 апреля, 20:43',
            'url': '/pet/1/'
        }
        # Add more pets here...
    ] * 10
    # Load categories
    categories = [
        {'icon': '􀌟', 'name': 'Кошки', 'url': '/catalog/1/'},
        {'icon': '􀌟', 'name': 'Собаки', 'url': '/catalog/1/'},
        {'icon': '􀌟', 'name': 'Грызуны', 'url': '/catalog/1/'},
        {'icon': '􀌟', 'name': 'Птицы', 'url': '/catalog/1/'},
        {'icon': '􀌟', 'name': 'Грумер', 'url': '/catalog/1/'},
        {'icon': '􀌟', 'name': 'Выгул', 'url': '/catalog/1/'},
        {'icon': '􀌟', 'name': 'Ветеринар', 'url': '/catalog/1/'},
        {'icon': '􀛧', 'name': 'Все категории', 'url': '/catalog-all/'}
    ]

    # Pass both banners and categories to the template
    return render(request, 'catalog/catalog.html', {'categories': categories, 'banners': banners, 'pets': pets, 'specialists': specialists})

def catalog_all(request):
    categories = [
        {
            "name": "Категория 1",
            "url": "/catalog/1/",  # Same URL for all categories
            "subcategories": [
                {"name": "Подкатегория 1", "url": "/catalog/1/"},
                {"name": "Подкатегория 2", "url": "/catalog/1/"},
                {"name": "Подкатегория 3", "url": "/catalog/1/"},
                {"name": "Подкатегория 4", "url": "/catalog/1/"},
                {"name": "Подкатегория 5", "url": "/catalog/1/"},
                {"name": "Подкатегория 6", "url": "/catalog/1/"},
                {"name": "Подкатегория 7", "url": "/catalog/1/"},
                {"name": "Подкатегория 8", "url": "/catalog/1/"}
            ]
        },
        {
            "name": "Категория 2",
            "url": "/catalog/1/",  # Same URL for all categories
            "subcategories": [
                {"name": "Подкатегория 1", "url": "/catalog/1/"},
                {"name": "Подкатегория 2", "url": "/catalog/1/"},
                {"name": "Подкатегория 3", "url": "/catalog/1/"},
                {"name": "Подкатегория 4", "url": "/catalog/1/"},
                {"name": "Подкатегория 5", "url": "/catalog/1/"},
                {"name": "Подкатегория 6", "url": "/catalog/1/"},
                {"name": "Подкатегория 7", "url": "/catalog/1/"},
                {"name": "Подкатегория 8", "url": "/catalog/1/"}
            ]
        },
        # Add more categories as needed, all pointing to /catalog/1/
    ]
    # Pass both banners and categories to the template
    return render(request, 'catalog/catalog-all.html', {'categories': categories})

def catalog_specific(request, pk):
    catalog_name = get_object_or_404(Catalog, pk=pk)
    items = catalog_name.items.all()  # Get all items related to this catalog
    context = {
        'catalog': catalog_name,
        'items': items,
    }
    return render(request, 'catalog-specific-list.html', context)
