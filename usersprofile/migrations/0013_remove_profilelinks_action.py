# Generated by Django 3.1.6 on 2022-11-05 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usersprofile', '0012_auto_20221105_1730'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profilelinks',
            name='action',
        ),
    ]
