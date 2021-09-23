# Generated by Django 3.2.7 on 2021-09-23 21:31

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=40)),
                ('static', models.BooleanField()),
            ],
            managers=[
                ('categories', django.db.models.manager.Manager()),
            ],
        ),
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
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=25)),
                ('price', models.FloatField()),
                ('account', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.mb_user')),
                ('category', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.category')),
            ],
            managers=[
                ('products', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('sale_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_date', models.CharField(max_length=20)),
                ('account', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.mb_user')),
            ],
            managers=[
                ('sales', django.db.models.manager.Manager()),
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
            name='Sale_Product',
            fields=[
                ('id_sale_product', models.AutoField(primary_key=True, serialize=False)),
                ('quantity_of_product', models.IntegerField()),
                ('product', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.product')),
                ('sale', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='sale_products', to='myBar_app.sale')),
            ],
            managers=[
                ('sales_products', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='account',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='myBar_app.mb_user'),
        ),
    ]
