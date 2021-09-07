from django.db import models
from account.models import User
from uuslug import uuslug as slugify
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=200, verbose_name='عنوان دسته‌بندی')
    slug = models.SlugField(max_length=100, unique=True, verbose_name='آدرس دسته‌بندی')
    photo = models.ImageField(upload_to="cat_images", verbose_name='تصویر دسته‌بندی')
    class Meta:
        verbose_name = 'دسته‌بندی'
        verbose_name_plural = 'دسته‌بندی ها'
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title, instance=self)
        super(Category, self).save(*args, **kwargs)
    def __str__(self):
        return '{}'.format(self.title)


class Book(models.Model):
    name = models.CharField(max_length=200, verbose_name='عنوان کتاب')
    slug = models.SlugField(max_length=100, unique=True, verbose_name='آدرس کتاب')
    description = models.TextField(verbose_name="توضیحات")
    image = models.ImageField(upload_to="images", verbose_name='تصویر کتاب')
    created = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ تشکیل کتاب')
    author = models.CharField(max_length=200, verbose_name='نویسنده')
    number_of_pages = models.IntegerField(verbose_name='تعداد صفحات کتاب')
    price = models.IntegerField(verbose_name='قیمت')
    percent = models.IntegerField(verbose_name='درصد تخفیف')
    category = models.ManyToManyField(Category, verbose_name='دسته‌بندی')
    offer = models.BooleanField(default=False, verbose_name='پیشنهاد ویژه')

    @property
    def get_book_offer_price(self):
        new_price = self.price * (1 - (self.percent / 100))
        return int(new_price)

    @property
    def get_avg_stars_percent(self):
        book_stars = Star.objects.filter(book=self)
        book_stars_scores = [bs.score for bs in book_stars]
        if len(book_stars) == 0:
            avg = 0
        else:
            avg = sum(book_stars_scores) / len(book_stars)
        return int((avg/5)*100)

    class Meta:
        verbose_name = 'کتاب'
        verbose_name_plural = 'کتابها'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name, instance=self)
        super(Book, self).save(*args, **kwargs)
        
    def __str__(self):
        return '{} - {}'.format(self.name, self.author)


class Comment(models.Model):
    content = models.TextField(verbose_name='محتوا')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='کاربر')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='comments', verbose_name='کتاب')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ انتشار')

    likes = models.ManyToManyField(User, blank=True, related_name='likes', verbose_name='لایک ها')

    def __str__(self):
        return '{} - {}'.format(self.book.name, self.user.username)
    
    class Meta:
        verbose_name = 'دیدگاه'
        verbose_name_plural = 'دیدگاه ها'
        ordering = ['-created_date']


class Star(models.Model):
    score = models.IntegerField(default=0, verbose_name='امتیاز',
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0),
        ]
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='کاربر')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='stars', verbose_name='کتاب')
    class Meta:
        verbose_name = 'امتیاز ستاره‌ای'
        verbose_name_plural = 'امتیازهای ستاره‌ای'
    def __str__(self):
        return '{} - {} - {}'.format(self.score, self.book.name, self.user.username)
