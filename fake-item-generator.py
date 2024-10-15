import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Pappy.settings')

# Initialize Django
django.setup()

from faker import Faker
from catalog.models import Catalog, Item
import random
from datetime import timedelta
from django.utils import timezone


# Set the environment variable to point to your Django settings module

# Initialize Faker instance
fake = Faker()

# Generate fake items for each catalog
def generate_fake_items():
    catalogs = Catalog.objects.all()  # Get all catalogs

    for catalog in catalogs:
        for _ in range(20):  # Generate 20 items per catalog
            title = fake.sentence(nb_words=3)
            price = random.randint(20000, 50000)
            gender = random.choice(['Мальчик', 'Девочка'])
            breed = fake.word()
            age = f"{random.randint(1, 5)} года"
            birthday = fake.date_this_decade()
            color = fake.safe_color_name()
            eyes = random.choice(['Голубые', 'Зеленые', 'Карие'])
            location = fake.city()
            date_added = timezone.now() - timedelta(days=random.randint(0, 365))
            likes = random.randint(0, 500)
            comments = random.randint(0, 100)
            shares = random.randint(0, 50)

            Item.objects.create(
                catalog=catalog,
                title=title,
                price=price,
                gender=gender,
                breed=breed,
                age=age,
                birthday=birthday,
                color=color,
                eyes=eyes,
                location=location,
                date_added=date_added,
                likes=likes,
                comments=comments,
                shares=shares
            )

    print("Fake items generated successfully!")

generate_fake_items()
