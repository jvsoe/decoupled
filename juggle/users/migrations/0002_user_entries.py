# Generated by Django 3.1.7 on 2021-03-09 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='entries',
            field=models.ManyToManyField(to='main.Entry'),
        ),
    ]
