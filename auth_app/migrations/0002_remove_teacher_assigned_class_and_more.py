# Generated by Django 5.2.1 on 2025-06-05 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='assigned_class',
        ),
        migrations.AddField(
            model_name='teacher',
            name='assigned_classes',
            field=models.ManyToManyField(blank=True, to='auth_app.classroom'),
        ),
    ]
