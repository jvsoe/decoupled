# Generated by Django 3.1.7 on 2021-03-09 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
        ('users', '0002_user_entries'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='entries',
            field=models.ManyToManyField(blank=True, to='main.Entry'),
        ),
    ]
