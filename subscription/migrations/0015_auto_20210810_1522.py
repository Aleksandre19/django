# Generated by Django 3.1.6 on 2021-08-10 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0014_subscription_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='subscribed',
            field=models.BooleanField(),
        ),
    ]