# Generated by Django 3.2.7 on 2021-10-05 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myBar_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='creation_date',
            field=models.CharField(max_length=60),
        ),
    ]