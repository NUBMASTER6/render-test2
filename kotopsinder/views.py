from django.shortcuts import render

def specialists(request):
    return render(request, 'kotopsinder/login-auth-1.html')

def pets(request):
    return render(request, 'kotopsinder/login-auth-2.html')

def signup(request):
    return render(request, 'kotopsinder/login-auth-3.html')

def signup_success(request):
    return render(request, 'kotopsinder/login-auth-5.html')