# Generated by Django 3.1.6 on 2022-11-04 14:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usersprofile', '0005_auto_20221104_1357'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profilelinks',
            old_name='video',
            new_name='category',
        ),
    ]
