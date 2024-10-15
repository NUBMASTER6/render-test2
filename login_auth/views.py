from django.shortcuts import render

def login(request):
    my_images = [
        {'url': 'path/to/image1.jpg', 'alt': 'Image 1'},
        {'url': 'path/to/image2.jpg', 'alt': 'Image 2'},
        {'url': 'path/to/image3.jpg', 'alt': 'Image 3'},
    ]
    return render(request, 'login-auth/login-auth-1.html', {'my_images': my_images})

def sms_validation(request):
    return render(request, 'login-auth/login-auth-2.html')

def signup(request):
    return render(request, 'login-auth/login-auth-3.html')

def signup_success(request):
    return render(request, 'login-auth/login-auth-5.html')

