# Generated by Django 4.2.1 on 2023-05-30 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homescout', '0004_alter_property_listed_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='listed_by',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
