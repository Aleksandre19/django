# Generated by Django 3.1.6 on 2022-11-05 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0021_auto_20221105_1637'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='likes',
            name='name',
        ),
        migrations.RemoveField(
            model_name='mylist',
            name='name',
        ),
    ]
