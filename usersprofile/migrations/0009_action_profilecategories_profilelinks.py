# Generated by Django 3.1.6 on 2022-11-05 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('videos', '0017_likes_mylist'),
        ('usersprofile', '0008_auto_20221105_1530'),
    ]

    operations = [
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='videos.likes')),
                ('mylist', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='videos.mylist')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=254)),
                ('icon', models.CharField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='ProfileLinks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=254)),
                ('page', models.CharField(max_length=254)),
                ('icon', models.CharField(max_length=254)),
                ('action', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='usersprofile.action')),
            ],
        ),
    ]
