# Generated by Django 3.2.4 on 2021-10-08 15:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eshop_category', '0006_alter_category_svg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='svg',
            field=models.FileField(blank=True, upload_to='cat_images', validators=[django.core.validators.FileExtensionValidator(['pdf', 'doc', 'svg'])], verbose_name='تصویر SVG'),
        ),
    ]
