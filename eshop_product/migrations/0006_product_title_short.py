# Generated by Django 3.2.4 on 2021-10-08 07:29

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('eshop_product', '0005_auto_20211008_1023'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='title_short',
            field=models.CharField(default=datetime.datetime(2021, 10, 8, 7, 29, 31, 941613, tzinfo=utc), max_length=200, verbose_name='عنوان کوتاه فارسی'),
            preserve_default=False,
        ),
    ]