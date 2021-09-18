# Generated by Django 3.2.7 on 2021-09-18 20:39

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mb_user',
            fields=[
                ('account_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25)),
                ('manager', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=256)),
            ],
            managers=[
                ('users', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='SecurityCode',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('security_code', models.IntegerField()),
                ('account', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.mb_user')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25)),
                ('price', models.FloatField()),
                ('account', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.mb_user')),
            ],
            managers=[
                ('products', django.db.models.manager.Manager()),
            ],
        ),
    ]
